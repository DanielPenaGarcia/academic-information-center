import { EntityNotFoundError } from "typeorm";
import { dataSource } from "../config/orm.config.js";

export class AuthService {
  constructor() {
    this.administratorRepository = dataSource.getRepository('Administrator');
  }

  async teacherLogin({ email, password }) {
  }

  async studentLogin({ email, password }) {
  }

  async administratorLogin({ academicId, password }) {
    const administrator = await this.administratorRepository.findOne({
      where: {
        password: password,
        academic: {
          academicId: academicId,
        },
      },
      relations: {
        academic: true,
      },
    });
    if (!administrator) {
      throw new EntityNotFoundError('Administrator not found');
    }
    return administrator;
  }

  async findUserByAcademicId({ academicId }) {
  }
}
