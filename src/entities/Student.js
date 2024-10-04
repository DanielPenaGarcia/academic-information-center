import { User } from "./User.js";

export class Student extends User {
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
    updatedAt = null,
    enrollmentAppointments = []
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
    this.enrollmentAppointments = enrollmentAppointments;
  }
}
