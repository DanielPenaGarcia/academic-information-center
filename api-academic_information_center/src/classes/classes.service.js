import { dataSource } from "../config/orm.config.js";
import { ClassSchema } from "../schemas/class.schema.js";
import { StudentSchema } from "../schemas/student.schema.js";
import { SubjectSchema } from "../schemas/subject.schema.js";
import { UserSchema } from "../schemas/user.schema.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";
import { days as daysOption } from "../utils/constanst/days.constants.js";
import { StudentClassSchema } from "../schemas/student-class.schema.js";
import { CourseMapSchema } from "../schemas/course-map.schema.js";
import { StudentCourseMapSchema } from "../schemas/student-course-map.schema.js";
import { In, Not } from "typeorm";

export class ClassesService {
  constructor() {
    this.classesRepository = dataSource.getRepository(ClassSchema);
    this.subjectRepository = dataSource.getRepository(SubjectSchema);
    this.teacherRepository = dataSource.getRepository(UserSchema);
    this.studentRepository = dataSource.getRepository(StudentSchema);
    this.studentClassRepository = dataSource.getRepository(StudentClassSchema);
    this.courseMapRepository = dataSource.getRepository(CourseMapSchema);
    this.studenCourseMapRepository = dataSource.getRepository(
      StudentCourseMapSchema
    );
  }

  async createClass({ startTime, duration, days, subjectId }) {
    const subject = await this.subjectRepository.findOne({
      where: {
        id: subjectId,
      },
    });
    if (!subject) {
      throw new BadRequestException(
        `Materia con id ${subjectId} no encontrada`
      );
    }
    const daysArray = days.split(",");
    const notDaysValid = daysArray.filter((day) => !daysOption.includes(day));
    if (notDaysValid.length > 0) {
      throw new BadRequestException(
        `Días no válidos: ${notDaysValid.join(
          ", "
        )}, los días válidos son: ${daysOption.join(", ")}`
      );
    }
    const classHours = (daysArray.length * duration) / 60;
    if (classHours > subject.hoursPerWeek) {
      throw new BadRequestException(
        `Las horas de la clase superan las horas por semana de la materia`
      );
    }
    const klass = this.classesRepository.create({
      startTime: startTime,
      days: days,
      duration: duration,
      subject: subject,
    });
    await this.classesRepository.save(klass);
    return klass;
  }

  async assignTeacherToClass({ classId, teacherId }) {
    const klass = await this.classesRepository.findOne({
      where: {
        id: classId,
      },
    });
    if (!klass) {
      throw new BadRequestException(`Clase con id ${classId} no encontrada`);
    }
    const teacher = await this.teacherRepository.findOne({
      where: {
        id: teacherId,
        role: "TEACHER",
      },
    });
    if (!teacher) {
      throw new BadRequestException(
        `Profesor con id ${teacherId} no encontrado`
      );
    }

    const teacherExist = klass.teacher === teacher;
    if (teacherExist) {
      throw new BadRequestException(`El profesor ya está asignado a la clase`);
    }

    klass.teacher = teacher;
    await this.classesRepository.save(klass);
    return klass;
  }

  async enrollStudent({ studentId, classId }) {
    const student = await this.studentRepository.findOne({
      where: {
        id: studentId,
      },
    });
    if (!student) {
      throw new BadRequestException(
        `No se encontró al alumno con el ID ${subjectId}`
      );
    }
    const klass = await this.classesRepository.findOne({
      where: {
        id: classId,
      },
    });
    if (!klass) {
      throw new BadRequestException(
        `No se encontró la clase con el ${subjectId}`
      );
    }

    const studentClass = this.studentClassRepository.create({
      student: studentId,
      klass: classId,
    });
    await this.studentClassRepository.save(studentClass);
    return studentClass;
  }

  async getAvailableClassesByStudent({ studentId }) {
    const student = await this.studentRepository.findOne({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      throw new BadRequestException(
        `No se encontró al alumno con el ID ${studentId}`
      );
    }
    const courseMapStudent = await this.studenCourseMapRepository.findOne({
      where: {
        student: studentId
      },
      relations: ["courseMap"],
    });

    const courseMapId = courseMapStudent.courseMapId;

    const courseMap = await this.courseMapRepository.findOne({
      where: {
        id: courseMapId,
      },
    });
    if (!courseMap) {
      throw new BadRequestException(
        `El alumno ${studentId} no tiene un plan curricular`
      );
    }
    const subjects = await this.subjectRepository.find({
      where: {
        courseMap: { id: courseMapId },
      },
      relations: ["subjectsRequirements"],
    });
    if (!subjects) {
      throw new BadRequestException(
        `El plan curricular ${courseMapId} no tiene materias`
      );
    }
    const subjectsIds = subjects.map((subject) => subject.id);
    const approvedSubjects = await this.studentClassRepository.find({
      where: {
        student: { id: studentId },
        status: "approved",
      },
    });

    const approvedSubjectIds = approvedSubjects.map((sc) => sc.subject_id);

    const eligibleSubjectIds = [];

    for (const subject of subjects) {
      const prerequisites = subject.subjectsRequirements.map((req) => req.id);

      const canEnroll =
        subject.semester === 1 ||
        prerequisites.length === 0 ||
        prerequisites.every((reqId) => approvedSubjectIds.includes(reqId));

      if (canEnroll) {
        eligibleSubjectIds.push(subject.id);
      }
    }
          
    let eligibleClasses = await this.classesRepository.find({
        where: {
          subject:{id: In(eligibleSubjectIds)},
        }, relations:["subject", "teacher"]
      });

      let currentClasses= await this.studentClassRepository.find({
        where: {
            status: ("PENDING"),
            student: { id: studentId }
        },
        relations: ['klass', 'student']
    });
    console.log("CURRENT")

    console.log(currentClasses)

    const currentClassIds = currentClasses.map((currentClass) => currentClass.klass.id);

    // Filter out the eligibleClasses that are already in currentClassIds
    eligibleClasses = eligibleClasses.filter(
      (eligibleClass) => !currentClassIds.includes(eligibleClass.id)
    );
    
    console.log(eligibleClasses);
    return eligibleClasses; 
    }
}
