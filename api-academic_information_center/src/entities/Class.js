export class Class {
  constructor(id, startTime, duration, description, days, student, subject, createdAt = null, updatedAt = null) {
    this.id = id;
    this.startTime = startTime;
    this.duration = duration;
    this.description = description;
    this.days = days;
    this.student = student;
    this.subject = subject;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
