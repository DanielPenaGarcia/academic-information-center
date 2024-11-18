import { dataSource } from "../config/orm.config.js";
import {TeacherSchema} from "../schemas/teacher.schema.js";
import { createAcademicEmail } from "../utils/functions/create-academic-email.function.js";
import { createAcademicPassword } from "../utils/functions/create-academic-password.function.js";
import {InternalServerErrorException} from "../utils/exceptions/http/internal-server-error.exception.js"

export class TeachersService {
  constructor() {
   this.teachersRepository = dataSource.getRepository(TeacherSchema);
  }

  async createTeacher({ names, fatherLastName, motherLastName}) {
    //TODO: Agregar photo a los values cuando se reciba de la petición
    let teacherCreated = null;
    await dataSource.transaction(async (transactionalEntityManager)=>{ //Transaction Implementation
      try{
      const teacher = {
        names: names,
        fatherLastName: fatherLastName,
        motherLastName: motherLastName,
        password: ""
    };
      // transactionalEntityManager.create(TeacherSchema,{}) Para armar el objeto
      teacherCreated = await transactionalEntityManager.save(TeacherSchema,teacher);

      teacherCreated = await transactionalEntityManager.findOneBy(TeacherSchema,{id:teacherCreated.id});

    const emailCreated = createAcademicEmail({
      name: teacherCreated.names,
      fatherLastName: teacherCreated.fatherLastName,
      academicId: teacherCreated.academicId,
    });

    const passwordCreated = createAcademicPassword({
      name: teacherCreated.names,
      fatherLastName: teacherCreated.fatherLastName,
      academicId: teacherCreated.academicId,
    });

    teacherCreated.email = emailCreated;
    teacherCreated.password = passwordCreated;

    await transactionalEntityManager.save(TeacherSchema,teacherCreated);
  }catch(error){
    throw new InternalServerErrorException("Error on create Teacher");
  }
    });
    return teacherCreated;
  }

  async updateTeacher({ academicId, names, fatherLastName, motherLastName, curp, photo }) {
    //TODO: UPDATE PHOTO
    // const values = [];

    // const condition = where().equal('academic_id', academicId).build();

    // const teacher = await this.teachersRepository.findOne({ condition: condition });
    // if (!teacher) {
    //   throw new Error(`Teacher with academic id ${academicId} not found`);
    // }

    // if (names) {
    //   values.push({
    //     column: "names",
    //     value: names
    //   });
    // }
    // if (fatherLastName) {
    //   values.push({
    //     column: "father_last_name",
    //     value: fatherLastName
    //   });
    // }
    // if (motherLastName) {
    //   values.push({
    //     column: "mother_last_name",
    //     value: motherLastName
    //   });
    // }
    // if (curp) {
    //   values.push({
    //     column: "curp",
    //     value: curp
    //   });
    // }
    // if (values.length == 0) {
    //   throw Error("Error empty values");
    // }

    // const conditionUpdate = where().equal('id', teacher.id).build();

    // const result = await this.teachersRepository.update({ setValues: values, conditions: conditionUpdate });

    // if(result.affectedRows!=1){
    //   throw Error("Something went wrong with the update");
    // }

    // return await this.teachersRepository.findOne({ condition: condition });;
  }
}
