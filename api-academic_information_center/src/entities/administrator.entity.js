import { User } from "./user.entity.js";

export class Administrator extends User {
  constructor({
    names,
    fatherLastName,
    motherLastName,
    curp,
    createdAt = null,
    updatedAt = null,
    id = null,
    email,
    password,
    academicId = null,
    photo = null,
  }) {
    super({
      names,
      fatherLastName,
      motherLastName,
      curp,
      createdAt,
      updatedAt,
      id,
      email,
      password,
      academicId,
      photo,
    });
  }
}
