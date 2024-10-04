import { User } from "./User.js";

export class Teacher extends User {
  constructor(
    id,
    name,
    fatherLastname,
    motherLastname,
    curp,
    email,
    password,
    academicId,
    photo,
    classes = [],
    subjects = [],
    createdAt = null,
    updatedAt = null
  ) {
    super(
      id,
      name,
      fatherLastname,
      motherLastname,
      curp,
      email,
      password,
      academicId,
      photo,
      createdAt,
      updatedAt
    );
    this.classes = classes;
    this.subjects = subjects;
  }
}
