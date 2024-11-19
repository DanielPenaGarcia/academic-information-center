import { dataSource } from "../config/orm.config.js";
import { StudentSchema } from "../schemas/student.schema.js";
import { InternalServerErrorException } from "../utils/exceptions/http/internal-server-error.exception.js";
import { BadRequestException } from "../utils/exceptions/http/bad-request.exception.js";
import { NotFoundException } from "../utils/exceptions/http/not-found.exception.js";
import { createAcademicEmail } from "../utils/functions/create-academic-email.function.js";
import { createAcademicPassword } from "../utils/functions/create-academic-password.function.js";

export class StudentsService {
  constructor() {
    this.studentRepository = dataSource.getRepository(StudentSchema);
  }

  async getStudentInfoByAcademicId({academicId}){
    const studentFound = await this.studentRepository.findOneBy({academicId:academicId});
    if(!studentFound){
      throw new NotFoundException("Student not found");
    }
    delete studentFound.password;
    return studentFound;
  }

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

  async updateStudentProfile({
    academicId,
    names,
    fatherLastName,
    motherLastName,
    password,
    curp,
    photo,
  }) {
    //TODO: UPDATE PHOTO

    const updateData = {};

    if(!academicId){
      throw new BadRequestException("Invalid academic Id");
    }

    if(names){
      updateData.names = names;
    }

    if(fatherLastName){
      updateData.fatherLastName = fatherLastName;
    }

    if(motherLastName){
      updateData.motherLastName = motherLastName;
    }

    if(password){
      updateData.password = password;
    }

    if(curp){
      updateData.curp = curp;
    }

    if(photo){
      updateData.photo = photo;
    }

    if(Object.keys(updateData).length == 0){
      throw new BadRequestException("Empty values, there are no values to update");
    }

    const response = await this.studentRepository.update({academicId:academicId},updateData);
    if(response.affected == 0){
      throw new NotFoundException("There were no updated teacher");
    }
    const studentUpdated = await this.studentRepository.findOneBy({academicId:academicId});
    return studentUpdated;

  }
}
