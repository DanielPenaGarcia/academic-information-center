import { BaseEntity } from "./base.entity.js";

export class StudentReview extends BaseEntity {
    student;
    teacher;
    klass;
    comment;
}