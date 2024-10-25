export class StudentClass {
  constructor({
    id = null,
    student,
    classRef,
    grade = null,
    status,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.student = student;
    this.classRef = classRef;
    this.grade = grade;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
