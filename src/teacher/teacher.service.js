import { Teacher } from "../../entities/Teacher.js";
import { where } from "../../query-builder/condition.builder.js";
import { BusinessException } from "../../utils/exceptions/business.exception.js";
import { Repository, RepositoryTable } from "../../utils/repository/repository.js";

export class TeacherService {
  constructor() {
    this.teacherRepository = new Repository(RepositoryTable.TEACHER);
  }

  async createTeacher(createTeacherDTO) {
    let fields = [
      "email",
      "password",
      "academic_id",
      "photo",
      "names",
      "father_last_name",
      "mother_last_name",
      "curp",
    ];
    let values = [
      [
        createTeacherDTO.email,
        createTeacherDTO.password,
        createTeacherDTO.academic_id,
        createTeacherDTO.photo,
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
