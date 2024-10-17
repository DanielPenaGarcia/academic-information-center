import { where } from "../query-builder/condition.builder.js";
import { createAcademicEmail, createPassword } from "../utils/functions/create-academic-email.function.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";


export class AdministratorService{
    constructor(){
        this.administratorRepository= new Repository(RepositoryTable.ADMINISTRATOR)
    }
    async createAdministrator(administratorDTO){
        let fields=[
            "email",
            "password",
            "academic_id",
            "names",
            "father_last_name",
            "mother_last_name",
            "curp",
        ];

        let userInformation ={
            names:administratorDTO.names,
            fatherLastName: administratorDTO.father_last_name,
            academicId: administratorDTO.academic_id
          };

        let values = [[
            createAcademicEmail(userInformation),
            createPassword(userInformation),
            administratorDTO.academic_id,
            administratorDTO.names,
            administratorDTO.father_last_name,
            administratorDTO.mother_last_name,
            administratorDTO.curp,
            ],];
        const result = await this.administratorRepository.create({fields, values});
        console.log(result)
        if(result.affectedRows===0){
            throw new Error("The administrator couldnt be created (they might be corrupted, run a background check asap)")
                }
        return await this.administratorRepository.findOneById(result.insertId)
    }

    async findAdministratorByEmailAndPassword(administratorDTO){
        const condition = where().equal("email", administratorDTO.email).and().equal("password", administratorDTO.password).build();
        try{
            return await this.administratorRepository.findOne({conditions:condition});
        }catch(error){
            throw new Error(`Error 404, admin not found:${error.message}`);
        }
    }
}
