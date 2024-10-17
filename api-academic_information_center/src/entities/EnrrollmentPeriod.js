export class EnrollmentPeriod {
  constructor(id, startDate, endDate, createdAt = null, updatedAt = null) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
