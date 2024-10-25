export class CourseMap {
  constructor({
    id = null,
    semesters,
    year,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.semesters = semesters;
    this.year = year;
    this.createdAt = createdAt;
    this.updated = updatedAt;
  }
}
