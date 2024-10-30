import { classDtoToEntityMapper } from "../utils/mappers/class-dto-to-entity.mapper.js";
import { studentDtoToEntityMapper } from "../utils/mappers/student-dto-to-entity.mapper.js";
import { subjectDtoToEntityMapper } from "../utils/mappers/subject-dto-to-entity.mapper.js";
import { teacherDtoToEntityMapper } from "../utils/mappers/teacher-dto-to-entity.mapper.js";
import { classReviewDtoToEntityMapper } from "../utils/mappers/class-review-dto-to-entity.mapper.js"
import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";
import { BusinessException } from "../utils/exceptions/business.exception.js";

export class ClassesService {
  constructor() {
    this.classesRepository = new Repository(RepositoryTable.CLASS);
    this.studentsRepository = new Repository(RepositoryTable.STUDENT);
    this.studentsClassesRepository = new Repository(RepositoryTable.STUDENTS_CLASSES);
    this.classesRepository = new Repository(RepositoryTable.CLASS);
    this.subjectsRepository = new Repository(RepositoryTable.SUBJECT);
    this.teachersRepository = new Repository(RepositoryTable.TEACHER);
    this.teachersClassesRepository = new Repository(RepositoryTable.TEACHERS_CLASSES);
    this.repositoryClassReview = new Repository(RepositoryTable.CLASS_REVIEW);
  }

  async createClass({ startTime, description, duration, days, subjectId, teacherId }) {
    const fields = ["start_time", "description", "duration", "days", "subject_id", "teacher_id"];
    const values = [[startTime, description, duration, days, subjectId, teacherId]];

    if (duration < 0) {
      throw new BusinessException("La duración de la clase debe ser mayor a 0");
    }
    const result = await this.classesRepository.create({
      fields: fields,
      values: values,
    });
    if (result.affectedRows === 0) {
      throw new BusinessException("Error creando la clase");
    }
    const classDTO = await this.classesRepository.findOneById(
      result.insertId
    );
    const classEntity = classDtoToEntityMapper(classDTO);
    return classEntity;
  }

  async updateClass({id, startTime, description, duration, days, subjectId}) {
    const values = [];

    if (duration < 0) {
      throw new BusinessException("La duración de la clase debe ser mayor a 0");
    }
    
    const classCondition = where().equal("id", id).build();
    const classDTO = await this.classesRepository.findOne({
      conditions: classCondition,
    });
    if (!classDTO) {
      throw new BusinessException("No se encontró la clase con el id proporcionado");
    }

    if (startTime) {
      values.push({
        column: "start_time",
        value: startTime,
      });
    }
    if (description) {
      values.push({
        column: "description",
        value: description,
      });
    }
    if (duration) {
      values.push({
        column: "duration",
        value: duration,
      });
    }
    if (days) {
      values.push({
        column: "days",
        value: days,
      });
    }
    if (subjectId) {
      values.push({
        column: "subject_id",
        value: subjectId,
      });
    }

    const conditionUpdate = where().equal("id", classDTO.id).build();
    const result = await this.classesRepository.update({setValues: values, conditions: conditionUpdate});
    if (result.affectedRows === 0) {
      throw new BusinessException("No se pudo actualizar la clase");
    }

    let classEntity = classDtoToEntityMapper(classDTO);
    return classEntity;
  }

  async findScheduleByStudentAcademicId({ academicId }) {
    const studentCondition = where().equal("academic_id", academicId).build();
    const studentDTO = await this.studentsRepository.findOne({
      conditions: studentCondition,
    });
    if (!studentDTO) {
      throw new BusinessException("No se encontró el estudiante con el id proporcionado");
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
      throw new BusinessException("No se encontró el maestro con el id proporcionado");
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

  async assignTeacher({ academicId, classId }) {

    const classCondition = where().equal("id", classId).build();
    console.log(classCondition)
    const classDTO = await this.classesRepository.findOne({
      conditions: classCondition,
    });
    if (!classDTO) {
      throw new BusinessException("Class not found");
    }
    const classRef = classDtoToEntityMapper(classDTO);

    const teacherCondition = where().equal("academic_id", academicId).build();
    console.log(teacherCondition)
    const teacherDTO = await this.teachersRepository.findOne({
      conditions: teacherCondition,
    });
    if (!teacherDTO) {
      throw new BusinessException("Teacher not found");
    }
    const teacher = teacherDtoToEntityMapper(teacherDTO);

    const values = [];
    values.push({
      column: "teacher_id",
      value: teacher.id
    });

    const conditionUpdate = where().equal("class_id", classId).build();
    const result = await this.classesRepository.update({ setValues: values, condition: conditionUpdate });
    return { classRef, teacher }
  }
}