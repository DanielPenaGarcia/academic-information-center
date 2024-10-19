import { createAcademicEmail } from "../utils/functions/create-academic-email.function.js";
import { createAcademicPassword } from "../utils/functions/create-academic-password.function.js";
import { studentDtoToEntityMapper } from "../utils/mappers/student-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class StudentsService {
  constructor() {
    this.repository = new Repository(RepositoryTable.STUDENT);
  }

  async createStudent({ names, fatherLastName, motherLastName, curp, photo }) {
    //TODO: Agregar photo a los values cuando se reciba de la petición
    const fields = ["names", "father_last_name", "mother_last_name", "curp"];
    const values = [[names, fatherLastName, motherLastName, curp]];
    const result = await this.repository.create({
      fields: fields,
      values: values,
    });
    if (result.affectedRows === 0) {
      throw new Error("Error creating student");
    }
    const studentDTO = await this.repository.findOneById(result.insertId);
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
    await this.repository.update({
      setValues: [
        { column: "email", value: email },
        { column: "password", value: password },
      ],
      conditions: where().equal("id", student.id).build(),
    });
    if (result.affectedRows === 0) {
      throw new Error("Error updating student");
    }
    student.email = email;
    student.password = password;
    return student;
  }
}
