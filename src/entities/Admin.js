import { User } from "./User.js";

export class Admin extends User {
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
  }
}
