import { administratorDtoToEntityMapper } from "../utils/mappers/administrator-dto-to-entity.mapper.js";
import { studentDtoToEntityMapper } from "../utils/mappers/student-dto-to-entity.mapper.js";
import { teacherDtoToEntityMapper } from "../utils/mappers/teacher-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class AuthService {
  constructor() {
    this.teacherRepository = new Repository(RepositoryTable.TEACHER);
    this.studentRepository = new Repository(RepositoryTable.STUDENT);
    this.administratorRepository = new Repository(
      RepositoryTable.ADMINISTRATOR
    );
  }

  async teacherLogin({ academicId, password }) {
    try {
      const condition = where()
        .equal("academic_id", academicId)
        .and()
        .equal("password", password)
        .build();
      const teacherDTO = await this.teacherRepository.findOne({
        conditions: condition,
      });
      const teacher = teacherDtoToEntityMapper(teacherDTO);
      return teacher;
    } catch (error) {
      throw error;
    }
  }

  async studentLogin({ academicId, password }) {
    try {
      const condition = where()
        .equal("academic_id", academicId)
        .and()
        .equal("password", password)
        .build();
      const studentDTO = await this.studentRepository.findOne({
        conditions: condition,
      });
      const student = studentDtoToEntityMapper(studentDTO);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async administratorLogin({ academicId, password }) {
    try {
      const condition = where()
        .equal("academic_id", academicId)
        .and()
        .equal("password", password)
        .build();
      const administratorDTO = await this.administratorRepository.findOne({
        conditions: condition,
      });
      const administrator = administratorDtoToEntityMapper(administratorDTO);
      return administrator;
    } catch (error) {
      throw error;
    }
  }

  // async teacherLogin({ email, password }) {
  //   const condition = where()
  //     .equal("email", email)
  //     .and()
  //     .equal("password", password)
  //     .build();
  //   const teacherDTO = await this.teacherRepository.findOne({
  //     conditions: condition,
  //   });
  //   const teacher = teacherDtoToEntityMapper(teacherDTO);
  //   return teacher;
  // }

  // async studentLogin({ email, password }) {
  //   const condition = where()
  //     .equal("email", email)
  //     .and()
  //     .equal("password", password)
  //     .build();
  //   const studentDTO = await this.studentRepository.findOne({
  //     conditions: condition,
  //   });
  //   const student = studentDtoToEntityMapper(studentDTO);
  //   return student;
  // }

  // async administratorLogin({ email, password }) {
  //   const condition = where()
  //     .equal("email", email)
  //     .and()
  //     .equal("password", password)
  //     .build();
  //   const administratorDTO = await this.administratorRepository.findOne({
  //     conditions: condition,
  //   });
  //   const administrator = administratorDtoToEntityMapper(administratorDTO);
  //   return administrator;
  // }

  // async findUserByAcademicId({ academicId }) {
  //   const teacherDTO = await this.teacherRepository.findOne({
  //     conditions: where().equal("academic_id", academicId).build(),
  //   });
  //   if (teacherDTO) {
  //     return teacherDtoToEntityMapper(teacherDTO);
  //   }

  //   const studentDTO = await this.studentRepository.findOne({
  //     conditions: where().equal("academic_id", academicId).build(),
  //   });
  //   if (studentDTO) {
  //     return studentDtoToEntityMapper(studentDTO);
  //   }

  //   const administratorDTO = await this.administratorRepository.findOne({
  //     conditions: where().equal("academic_id", academicId).build(),
  //   });
  //   if (administratorDTO) {
  //     return administratorDtoToEntityMapper(administratorDTO);
  //   }
  //   return null;
  // }
}
