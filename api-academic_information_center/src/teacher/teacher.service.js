import { where } from "../query-builder/condition.builder.js";
import { createAcademicEmail, createPassword } from "../utils/functions/create-academic-email.function.js";
import { Repository, RepositoryTable } from "../utils/repository/repository.js";

export class TeacherService {
  constructor() {
    this.teacherRepository = new Repository(RepositoryTable.TEACHER);
  }

  async createTeacher(createTeacherDTO) {
    let fields = [
      "email",
      "password",
      "academic_id",
      "names",
      "father_last_name",
      "mother_last_name",
      "curp",
    ];

    let userInformation ={
      names:createTeacherDTO.names,
      fatherLastName: createTeacherDTO.father_last_name,
      academicId: createTeacherDTO.academic_id
    };

    let values = [
      [
        createAcademicEmail(userInformation),
        createPassword(userInformation),
        createTeacherDTO.academic_id,
        createTeacherDTO.names,
        createTeacherDTO.father_last_name,
        createTeacherDTO.mother_last_name,
        createTeacherDTO.curp,
      ],
    ];
    const result = await this.teacherRepository.create({ fields, values });
    if (result.affectedRows === 0) {
      throw new Error("Teacher not created");
    }
    const teacherSaved = await this.teacherRepository.findOneById(result.insertId);
    return teacherSaved;
  }

  async findTeacherByEmailAndPaswword(teacherDTO) {
    const condition = where().equal("email", teacherDTO.email).and().equal("password", teacherDTO.password).build();
    try{
      const teacher = await this.teacherRepository.findOne({ conditions: condition });
      return teacher;
    }catch(error){
      throw new Error(`Error al buscar el profesor por email y contraseña: ${error.message}`);
    }
  }
}
