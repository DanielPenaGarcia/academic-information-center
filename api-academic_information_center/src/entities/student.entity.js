import { User } from "./user.entity.js";

export class Student extends User {
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
    enrollmentAppointments = [],
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
    this.enrollmentAppointments = enrollmentAppointments;
  }
}
