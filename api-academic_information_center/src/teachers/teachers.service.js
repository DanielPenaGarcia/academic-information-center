import { createAcademicEmail } from "../utils/functions/create-academic-email.function.js";
import { createAcademicPassword } from "../utils/functions/create-academic-password.function.js";
import { teacherDtoToEntityMapper } from "../utils/mappers/teacher-dto-to-entity.mapper.js";
import { where } from "../utils/query-builder/condition.builder.js";
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

  async updateTeacher({academicId,names,fatherLastName,motherLastName,curp,photo}){
    //TODO: UPDATE PHOTO
    const values = [];

    const condition = where().equal('academic_id',academicId).build();

    const teacher = await this.teachersRepository.findOne({condition: condition});
    if(!teacher){
      throw new Error(`Teacher with academic id ${academicId} not found`);
    }

    if(names){
      values.push({
        column:"names",
        value:names
      });
    }
    if(fatherLastName){
      values.push({
        column:"father_last_name",
        value:fatherLastName
      });
    }
    if(motherLastName){
      values.push({
        column:"mother_last_name",
        value:motherLastName
      });
    }
    if(curp){
      values.push({
        column:"curp",
        value:curp
      });
    }
    if(values.length==0){
      throw Error("Error empty values");
    }

    const conditionUpdate = where().equal('id',teacher.id).build();

    const result = await this.teachersRepository.update({setValues: values ,conditions:conditionUpdate});
    return result;
  }
}
