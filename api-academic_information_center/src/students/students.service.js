import { dataSource } from "../config/orm.config.js";
import { StudentSchema } from "../schemas/student.schema.js";
import { InternalServerErrorException } from "../utils/exceptions/http/internal-server-error.exception.js";
import { createAcademicEmail } from "../utils/functions/create-academic-email.function.js";
import { createAcademicPassword } from "../utils/functions/create-academic-password.function.js";

export class StudentsService {
  constructor() {}

  async createStudent({ names, fatherLastName, motherLastName, curp, photo }) {
      const studentCreated = await dataSource.transaction(async (transactionalEntityManager)=>{
        try{

          const student = {
            names:names,
            fatherLastName:fatherLastName,
            motherLastName:motherLastName,
            password:""};

            const studentCreated = await transactionalEntityManager.save(StudentSchema,student);
            const studentCreatedFound = await transactionalEntityManager.findOneBy(StudentSchema,{id:studentCreated.id});

            const emailCreated = createAcademicEmail({
              name: studentCreatedFound.names,
              fatherLastName: studentCreatedFound.fatherLastName,
              academicId: studentCreatedFound.academicId,
            });
        
            const passwordCreated = createAcademicPassword({
              name: studentCreatedFound.names,
              fatherLastName: studentCreatedFound.fatherLastName,
              academicId: studentCreatedFound.academicId,
            });

            studentCreatedFound.email = emailCreated;
            studentCreatedFound.password = passwordCreated;

            await transactionalEntityManager.save(StudentSchema,studentCreatedFound);
            return studentCreatedFound;
        }catch(error){
          throw new InternalServerErrorException("Error on create student")
        }
      });
      return studentCreated;
  }

  // async updateStudentProfile({
  //   academicId,
  //   names,
  //   fatherLastName,
  //   motherLastName,
  //   curp,
  //   photo,
  // }) {
  //   //TODO: UPDATE PHOTO
  //   const values = [];

  //   const condition = where().equal("academic_id", academicId).build();

  //   const student = await this.studentsRepository.findOne({
  //     condition: condition,
  //   });
  //   if (!student) {
  //     throw new BusinessException(
  //       `Student with academic id ${academicId} not found`
  //     );
  //   }

  //   if (names) {
  //     values.push({
  //       column: "names",
  //       value: names,
  //     });
  //   }
  //   if (fatherLastName) {
  //     values.push({
  //       column: "father_last_name",
  //       value: fatherLastName,
  //     });
  //   }
  //   if (motherLastName) {
  //     values.push({
  //       column: "mother_last_name",
  //       value: motherLastName,
  //     });
  //   }
  //   if (curp) {
  //     values.push({
  //       column: "curp",
  //       value: curp,
  //     });
  //   }
  //   if (values.length == 0) {
  //     throw BusinessException("Error empty values");
  //   }

  //   const conditionUpdate = where().equal("id", student.id).build();

  //   const result = await this.studentsRepository.update({
  //     setValues: values,
  //     conditions: conditionUpdate,
  //   });

  //   if (result.affectedRows != 1) {
  //     throw BusinessException("Something went wrong with the update");
  //   }
  //   return await this.studentsRepository.findOne({ condition: condition });
  // }
}
