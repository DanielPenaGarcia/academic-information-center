import { classDtoToEntityMapper } from "../utils/mappers/class-dto-to-entity.mapper.js";
import { studentDtoToEntityMapper } from "../utils/mappers/student-dto-to-entity.mapper.js";
import { subjectDtoToEntityMapper } from "../utils/mappers/subject-dto-to-entity.mapper.js";
import { teacherDtoToEntityMapper } from "../utils/mappers/teacher-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class ClassesService {
  constructor() {
    this.classesRepository = new Repository(RepositoryTable.CLASS);
    this.studentsRepository = new Repository(RepositoryTable.STUDENT);
    this.studentsClassesRepository = new Repository(
      RepositoryTable.STUDENTS_CLASSES
    );
    this.classesRepository = new Repository(RepositoryTable.CLASS);
    this.subjectsRepository = new Repository(RepositoryTable.SUBJECT);
    this.teachersRepository = new Repository(RepositoryTable.TEACHER);
    this.teachersClassesRepository = new Repository(
      RepositoryTable.TEACHERS_CLASSES
    );
  }

  async findScheduleByStudentAcademicId({ academicId }) {
    const studentCondition = where().equal("academic_id", academicId).build();
    const studentDTO = await this.studentsRepository.findOne({
      conditions: studentCondition,
    });
    if (!studentDTO) {
      throw new Error("Student not found");
    }
    const student = studentDtoToEntityMapper(studentDTO);
    const classesStudentsCondition = where()
      .equal("student_id", student.id)
      .build();
    const studentClassesDTOs = await this.studentsClassesRepository.find({
      conditions: classesStudentsCondition,
    });
    const classes = await Promise.all(
      studentClassesDTOs.map(async (studentClassDTO) => {
        const classDTO = await this.classesRepository.findOneById(
          studentClassDTO.class_id
        );
        const teacherDTO = await this.teachersRepository.findOneById(
          classDTO.teacher_id
        );
        const teacher = teacherDtoToEntityMapper(teacherDTO);
        const subjectDTO = await this.subjectsRepository.findOneById(
          classDTO.subject_id
        );
        const subject = subjectDtoToEntityMapper(subjectDTO);
        let classEntity = classDtoToEntityMapper(classDTO);
        classEntity.teacher = {
          id: teacher.id,
          names: teacher.names,
          fatherLastName: teacher.fatherLastName,
          motherLastName: teacher.motherLastName,
        };
        classEntity.subject = { id: subject.id, name: subject.name };
        return classEntity;
      })
    );
    return classes;
  }

  async findScheduleByTeacherAcademicId({ academicId }) {
    const teacherCondition = where().equal("academic_id", academicId).build();
    const teacherDTO = await this.teachersRepository.findOne({
      conditions: teacherCondition,
    });
    if (!teacherDTO) {
      throw new Error("Teacher not found");
    }
    const teacher = teacherDtoToEntityMapper(teacherDTO);
    const teachersClassesCondition = where()
      .equal("teacher_id", teacher.id)
      .build();
    const teacherClassesDTOs = await this.classesRepository.find({
      conditions: teachersClassesCondition,
    });
    const classes = await Promise.all(
      teacherClassesDTOs.map(async (teacherClassDTO) => {
        const subjectDTO = await this.subjectsRepository.findOneById(
          teacherClassDTO.subject_id
        );
        const subject = subjectDtoToEntityMapper(subjectDTO);
        let classEntity = classDtoToEntityMapper(teacherClassDTO);
        classEntity.subject = { id: subject.id, name: subject.name };
        return classEntity;
      })
    );
    return classes;
  }
}
