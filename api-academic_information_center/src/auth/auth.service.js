import { EntityNotFoundError } from "typeorm";
import { dataSource } from "../config/orm.config.js";
import { UserSchema } from "../schemas/user.schema.js";
import { NotFoundException } from "../utils/exceptions/http/not-found.exception.js";

export class AuthService {
  constructor() {
    this.userRepository = dataSource.getRepository(UserSchema);
  }

  async login({ academicId, password }) {
    const user = await this.userRepository.findOne({
      where: {
        academicId: academicId,
        password: password,
      },
    });
    if(!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
