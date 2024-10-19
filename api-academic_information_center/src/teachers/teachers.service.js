import { createAcademicEmail } from "../utils/functions/create-academic-email.function.js";
import { createAcademicPassword } from "../utils/functions/create-academic-password.function.js";
import { teacherDtoToEntityMapper } from "../utils/mappers/teacher-dto-to-entity.mapper.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class TeachersService {
  constructor() {
    this.teachersRepository = new Repository(RepositoryTable.TEACHER);
  }

  async createTeacher({ names, fatherLastName, motherLastName, curp, photo }) {
    //TODO: Agregar photo a los values cuando se reciba de la petición
    const fields = ["names", "father_last_name", "mother_last_name", "curp"];
    const values = [[names, fatherLastName, motherLastName, curp]];
    const result = await this.teachersRepository.create({
      fields: fields,
      values: values,
    });
    if (result.affectedRows === 0) {
      throw new Error("Error creating teacher");
    }
    const teacherDTO = await this.teachersRepository.findOneById(
      result.insertId
    );
    let teacher = teacherDtoToEntityMapper(teacherDTO);
    const email = createAcademicEmail({
      name: teacher.names,
      fatherLastName: teacher.fatherLastName,
      academicId: teacher.academicId,
    });
    const password = createAcademicPassword({
      name: teacher.names,
      fatherLastName: teacher.fatherLastName,
      academicId: teacher.academicId,
    });
    await this.teachersRepository.update({
      setValues: [
        { column: "email", value: email },
        { column: "password", value: password },
      ],
      conditions: where().equal("id", teacher.id).build(),
    });
    if (result.affectedRows === 0) {
      throw new Error("Error updating teacher");
    }
    teacher.email = email;
    teacher.password = password;
    return teacher;
  }
}
