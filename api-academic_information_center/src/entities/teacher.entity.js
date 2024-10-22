import { User } from "./user.entity.js";

export class Teacher extends User {
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
    classes = [],
    subjects = [],
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
    this.subjects = subjects;
    this.classes = classes;
  }
}
