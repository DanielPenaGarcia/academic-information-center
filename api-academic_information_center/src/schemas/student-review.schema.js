import { EntitySchema } from "typeorm";
import { StudentReview } from "../entities/student-review.entity.js";

export const StudentReviewSchema = new EntitySchema({
    name: 'StudentReview',
    tableName: 'student_reviews',
    target: StudentReview,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        comment: {
            type: 'text',
            nullable: true,
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            createDate: true,
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            updateDate: true,
        },
    },
    relations: {
        StudentClass: {
            target: 'StudentClass',
            type: 'many-to-one',
            joinColumn: {
                name: 'student_class_id',
            },
            cascade: true,
        },
        Teacher: {
            target: 'Teacher',
            type: 'many-to-one',
            joinColumn: {
                name: 'teacher_id',
            },
            cascade: true,
        },
    }
});