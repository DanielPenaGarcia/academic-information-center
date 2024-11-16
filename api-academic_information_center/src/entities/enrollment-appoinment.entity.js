import { BaseEntity } from "./base.entity.js";

export class EnrollmentAppoinment extends BaseEntity {
    startDateTime;
    student;
    enrollmentPeriod;
}