import { EntityNotFoundError } from "typeorm";
import { dataSource } from "../config/orm.config.js";

export class AuthService {
  constructor() {
    this.administratorRepository = dataSource.getRepository("Administrator");
    this.studentRepository = dataSource.getRepository("Student");
    this.teacherRepository = dataSource.getRepository("Teacher");
  }

  async login({ academicId, password }) {
    let Role = "";
    const administrator = await this.administratorRepository.findOne({
      where: { academic: { academicId: academicId }, password: password },
      relations: ["academic"],
    });
    if (administrator) {
      Role = "ADMINISTRATOR";
      return { ...administrator, role: Role };
    }
    const student = await this.studentRepository.findOne({
      where: { academic: { academicId: academicId }, password: password },
      relations: ["academic"],
    });
    if (student) {
      Role = "STUDENT";
      return { ...student, role: Role };
    }
    const teacher = await this.teacherRepository.findOne({
      where: { academic: { academicId: academicId }, password: password },
      relations: ["academic"],
    });
    if (teacher) {
      Role = "TEACHER";
      return { ...teacher, role: Role };
    }
    throw new EntityNotFoundError("User not found");
  }
}
