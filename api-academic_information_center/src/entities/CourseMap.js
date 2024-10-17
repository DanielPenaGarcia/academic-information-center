export class CourseMap {
  constructor(year, semesters, classes = [], createdAt = null, updatedAt = null) {
    this.year = year;
    this.semesters = semesters;
    this.classes = classes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
