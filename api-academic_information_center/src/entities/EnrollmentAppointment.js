export class EnrollmentAppointment {
  contructor(id, startDate, enrollmentPeriod, createdAt = null, updatedAt = null) {
    this.id = id;
    this.startDate = startDate;
    this.enrollmentPeriod = enrollmentPeriod;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
