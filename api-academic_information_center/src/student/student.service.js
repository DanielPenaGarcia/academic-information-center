import { where } from "../query-builder/condition.builder.js";
import { createAcademicEmail, createPassword } from "../utils/functions/create-academic-email.function.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class StudentService{
    constructor(){
        this.studentRepository= new Repository(RepositoryTable.STUDENT)
    }

    async createStudent(createStudentDTO){
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
            names:createStudentDTO.names,
            fatherLastName: createStudentDTO.father_last_name,
            academicId: createStudentDTO.academic_id
          };

        let values = [[
            createAcademicEmail(userInformation),
            createPassword(userInformation),
            createStudentDTO.academic_id,
            createStudentDTO.names,
            createStudentDTO.father_last_name,
            createStudentDTO.mother_last_name,
            createStudentDTO.curp,
            ],];
            const result = await this.studentRepository.create({fields, values});
            if(result.affectedRows===0){
                throw new Error("Stude-n't-created") //https://media.tenor.com/Va9M6DvKygYAAAAM/ba-dum-tsss-drum.gif
            }
            return await this.studentRepository.findOneById(result.insertId)
    }

    async findStudentByEmailAndPassword(studentDTO){
        const condition = where().equal("email", studentDTO.email).and().equal("password", studentDTO.password).build();
        try{
            return await this.studentRepository.findOne({conditions:condition});
        }catch(error){
            throw new Error(`Error buscando al alumno, si el problema persiste paque la colegiatura:${error.message}`);
        }
    }

}