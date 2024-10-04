export class Subject {
  constructor(id, name, hoursPerWeek, semester, classes = [], createdAt = null, updatedAt = null) {
    this.id = id;
    this.name = name;
    this.hoursPerWeek = hoursPerWeek;
    this.semester = semester;
    this.classes = classes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
