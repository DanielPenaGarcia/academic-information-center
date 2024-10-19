import { Person } from "./person.entity.js";

export class User extends Person {
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
    });
    this.id = id;
    this.email = email;
    this.password = password;
    this.academicId = academicId;
    this.photo = photo;
  }
}
