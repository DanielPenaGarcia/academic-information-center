import { EntitySchema } from "typeorm";

export const ClassReview = new EntitySchema({
    name: "ClassReview",
    tableName: "class_reviews",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        comment: {
            type: 'varchar',
            length: 255,
        },
        createdAt: {
            type: 'timestamp',
            name: 'created_at',
            createDate: true,
        },
        updatedAt: {
            type: 'timestamp',
            name: 'updated_at',
            updateDate: true,
        },
    },
    relations: {
        student: {
            target: "Student",
            type: "many-to-one",
            joinColumn: {
                name: 'student_id',
            },
        },
        class: {
            target: "Class",
            type: "many-to-one",
            joinColumn: {
                name: 'class_id',
            },
        },
    }
});