import { BaseEntity } from "typeorm";

export class EnrollmentAppoinment extends BaseEntity {
    startDateTime;
    enrollmentPeriod;
    student;
}