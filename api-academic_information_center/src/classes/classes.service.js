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
import { StatusClass } from "../entities/enums/status-class.enum.js";
import { Klass } from "../entities/klass.entity.js";
import { role } from "../entities/enums/role.enum.js";

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

  async createClass({ startTime, duration, days, subjectId, classroom }) {
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
      classroom: classroom,
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
        `No se encontró al alumno con el ID ${studentId}`
      );
    }
    const klass = await this.classesRepository.findOne({
      where: {
        id: classId,
      },
      relations: ["subject"],
    });
    if (!klass) {
      throw new BadRequestException(
        `No se encontró la clase con el ${classId}`
      );
    }

    let enrolledClasses = await this.getEnrolledClasses({ studentId });

    // Normalize `enrolledClasses` to be an array
    if (!Array.isArray(enrolledClasses)) {
      // Case 1: If it's a single object, wrap it in an array
      enrolledClasses = [enrolledClasses];
    } else if (enrolledClasses.data && Array.isArray(enrolledClasses.data)) {
      // Case 2: If it's an object with an array under a property called `data`
      enrolledClasses = enrolledClasses.data;
    }

    // Iterate over the normalized `enrolledClasses` array
    enrolledClasses.forEach((studentClass) => {
      const enrolledKlass = studentClass.klass;
      console.log(studentClass);
      // Check if there is a common day between `enrolledKlass` and `klass`
      for (let i = 0; i < enrolledKlass.days.length; i++) {
        if (
          klass.days.includes(enrolledKlass.days[i]) &&
          this.#doHoursClash({ enrolledKlass, klass })
        ) {
          throw new Error(
            `La clase ${klass.subject.name} se empalma con la clase ${enrolledKlass.subject.name}`
          );
        }
      }
    });

    const studentClass = this.studentClassRepository.create({
      student: studentId,
      klass: classId,
    });
    await this.studentClassRepository.save(studentClass);
    return studentClass;
  }

  #doHoursClash({ enrolledKlass, klass }) {
    const parseTime = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return { hours, minutes };
    };

    // Function to add minutes to a start time
    const addMinutes = (time, minutesToAdd) => {
      const newTime = new Date(0, 0, 0, time.hours, time.minutes);
      newTime.setMinutes(newTime.getMinutes() + minutesToAdd);
      return newTime;
    };

    // Convert `startTime` to Date objects
    const enrolledStartTime = parseTime(enrolledKlass.startTime);
    const newClassStartTime = parseTime(klass.startTime);

    // Calculate end times by adding duration (in minutes)
    const enrolledEndTime = addMinutes(
      enrolledStartTime,
      enrolledKlass.duration
    );
    const newClassEndTime = addMinutes(newClassStartTime, klass.duration);

    // Create Date objects for comparisons
    const enrolledStartDate = new Date(
      0,
      0,
      0,
      enrolledStartTime.hours,
      enrolledStartTime.minutes
    );
    const enrolledEndDate = enrolledEndTime;

    const newClassStartDate = new Date(
      0,
      0,
      0,
      newClassStartTime.hours,
      newClassStartTime.minutes
    );
    const newClassEndDate = newClassEndTime;

    // Check if time periods clash
    return (
      (newClassStartDate < enrolledEndDate &&
        newClassEndDate > enrolledStartDate) ||
      (enrolledStartDate < newClassEndDate &&
        enrolledEndDate > newClassStartDate)
    );
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
        student: studentId,
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
        subject: { id: In(eligibleSubjectIds) },
      },
      relations: ["subject", "teacher"],
    });

    let currentClasses = await this.studentClassRepository.find({
      where: {
        status: "PENDING",
        student: { id: studentId },
      },
      relations: ["klass", "student"],
    });

    const currentClassIds = currentClasses.map(
      (currentClass) => currentClass.klass.id
    );

    eligibleClasses = eligibleClasses.filter(
      (eligibleClass) => !currentClassIds.includes(eligibleClass.id)
    );

    return eligibleClasses;
  }

  async getEnrolledClasses({ studentId }) {
    let enrolledClasses = await this.studentClassRepository.find({
      where: {
        status: "PENDING",
        student: { id: studentId },
      },
      relations: ["klass", "klass.subject", "klass.teacher"],
    });

    return enrolledClasses;
  }

  async dropClass({ studentId, classId }) {
    // Find the student
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

    // Find the class
    const klass = await this.classesRepository.findOne({
      where: {
        id: classId,
      },
    });
    if (!klass) {
      throw new BadRequestException(
        `No se encontró la clase con el ID ${classId}`
      );
    }

    // Update the student's enrollment status to 'CANCELED'
    const response = await this.studentClassRepository.update(
      { student: { id: studentId }, klass: { id: classId } }, // Use relations for student and class
      { status: StatusClass.CANCELED } // Setting the status to CANCELED
    );

    // If no rows were affected, throw an error
    if (response.affected === 0) {
      throw new NotFoundException(
        "The class was NOT dropped, Good luck getting a passing grade :)"
      );
    }

    // Fetch the updated studentClass to return
    const studentClass = await this.studentClassRepository.findOne({
      where: {
        student: { id: studentId },
        klass: { id: classId },
      },
    });

    return studentClass;
  }

  async updateDescription({
    classId,
    description,
    user: { academicId },
    currentRole,
  }) {
    const klass = await this.classesRepository.findOne({
      where: {
        id: classId,
      },
      relations: {
        teacher: true,
      },
      select: {
        id: true,
        teacher: {
          academicId: true,
        },
      },
    });
    if (!klass) {
      throw new BadRequestException(
        `No se encontró la clase con el ID ${classId}`
      );
    }
    if (klass.teacher.academicId !== academicId && currentRole !== role.ADMIN) {
      throw new BadRequestException(
        `No tienes permisos para actualizar la descripción de la clase`
      );
    }
    const response = await this.classesRepository.update(
      { id: classId },
      { description }
    );
    if (response.affected === 0) {
      throw new BadRequestException(
        `No se actualizó la descripción de la clase`
      );
    }
    const updatedClass = await this.classesRepository.findOne({
      where: { id: classId },
    });
    return updatedClass;
  }
}
