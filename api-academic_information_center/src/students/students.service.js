import { BusinessException } from "../utils/exceptions/business.exception.js";
import { createAcademicEmail } from "../utils/functions/create-academic-email.function.js";
import { createAcademicPassword } from "../utils/functions/create-academic-password.function.js";
import { classDtoToEntityMapper } from "../utils/mappers/class-dto-to-entity.mapper.js";
import { studentClassDtoToEntityMapper } from "../utils/mappers/student-class-dto-to-entity.mapper.js";
import { studentDtoToEntityMapper } from "../utils/mappers/student-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";
import { JoinTypes } from "../utils/query-builder/query.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class StudentsService {
  constructor() {
    this.studentsRepository = new Repository(RepositoryTable.STUDENT);
    this.studentsClassesRepository = new Repository(
      RepositoryTable.STUDENTS_CLASSES
    );
    this.classesRepository = new Repository(RepositoryTable.CLASS);
  }

  async createStudent({ names, fatherLastName, motherLastName, curp, photo }) {
    //TODO: Agregar photo a los values cuando se reciba de la petición
    const fields = ["names", "father_last_name", "mother_last_name", "curp"];
    const values = [[names, fatherLastName, motherLastName, curp]];
    const result = await this.studentsRepository.create({
      fields: fields,
      values: values,
    });
    if (result.affectedRows === 0) {
      throw new BusinessException("Error creating student");
    }
    const studentDTO = await this.studentsRepository.findOneById(
      result.insertId
    );
    let student = studentDtoToEntityMapper(studentDTO);
    const email = createAcademicEmail({
      name: student.names,
      fatherLastName: student.fatherLastName,
      academicId: student.academicId,
    });
    const password = createAcademicPassword({
      name: student.names,
      fatherLastName: student.fatherLastName,
      academicId: student.academicId,
    });
    await this.studentsRepository.update({
      setValues: [
        { column: "email", value: email },
        { column: "password", value: password },
      ],
      conditions: where().equal("id", student.id).build(),
    });
    if (result.affectedRows === 0) {
      throw new BusinessException("Error updating student");
    }
    student.email = email;
    student.password = password;
    return student;
  }

  async updateStudentProfile({
    academicId,
    names,
    fatherLastName,
    motherLastName,
    curp,
    photo,
  }) {
    //TODO: UPDATE PHOTO
    const values = [];

    const condition = where().equal("academic_id", academicId).build();

    const student = await this.studentsRepository.findOne({
      condition: condition,
    });
    if (!student) {
      throw new BusinessException(
        `Student with academic id ${academicId} not found`
      );
    }

    if (names) {
      values.push({
        column: "names",
        value: names,
      });
    }
    if (fatherLastName) {
      values.push({
        column: "father_last_name",
        value: fatherLastName,
      });
    }
    if (motherLastName) {
      values.push({
        column: "mother_last_name",
        value: motherLastName,
      });
    }
    if (curp) {
      values.push({
        column: "curp",
        value: curp,
      });
    }
    if (values.length == 0) {
      throw BusinessException("Error empty values");
    }

    const conditionUpdate = where().equal("id", student.id).build();

    const result = await this.studentsRepository.update({
      setValues: values,
      conditions: conditionUpdate,
    });

    if (result.affectedRows != 1) {
      throw BusinessException("Something went wrong with the update");
    }
    return await this.studentsRepository.findOne({ condition: condition });
  }
}