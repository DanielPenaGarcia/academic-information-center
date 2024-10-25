export class EnrollmentAppointment {
    constructor({
        id = null,
        student,
        enrollmentPeriod,
        startDateTime,
        createdAt = null,
        updatedAt = null,
    }){
        this.id = id;
        this.student = student;
        this.enrollmentPeriod = enrollmentPeriod;
        this.startDateTime = startDateTime;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}