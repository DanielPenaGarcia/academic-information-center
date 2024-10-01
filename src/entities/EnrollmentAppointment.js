import { EnrollmentPeriodPeriod } from './EnrrollmentPeriod.js';

export class EnrollmentAppointment{
    contructor(id,startDate,enrollmentPeriod){
        this.id=id;
        this.startDate=startDate;
        this.enrollmentPeriod=enrollmentPeriod;
    }
}