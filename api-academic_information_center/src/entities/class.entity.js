export class Class {
  constructor({
    id = null,
    startTime,
    duration,
    days,
    student,
    subject,
    teacher,
    createdAt = null,
    updatedAt = null,
    description,
  }) {
    this.id = id;
    this.startTime = startTime;
    this.duration = duration;
    this.days = days;
    this.student = student;
    this.subject = subject;
    this.teacher = teacher;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
  }
}
