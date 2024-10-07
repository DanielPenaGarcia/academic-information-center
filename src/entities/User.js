import { Person } from "./Person.js";

export class User extends Person {
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
    super(name, fatherLastname, motherLastname, curp);
    this.id = id;
    this.email = email;
    this.password = password;
    this.academicId = academicId;
    this.photo = photo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
