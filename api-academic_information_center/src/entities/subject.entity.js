export class Subject {
  constructor({
    id = null,
    name,
    hoursPerWeek,
    semester,
    courseMap = null,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.name = name;
    this.hoursPerWeek = hoursPerWeek;
    this.semester = semester;
    this.courseMap = courseMap;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
