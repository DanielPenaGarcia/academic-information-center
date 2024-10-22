export class Class {
  constructor({
    id = null,
    startTime,
    duration,
    days,
    student,
    subject,
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
  }
}
