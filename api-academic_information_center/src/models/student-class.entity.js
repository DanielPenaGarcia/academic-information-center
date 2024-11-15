import { EntitySchema } from "typeorm";

export const StudentClass = new EntitySchema({
    name: "StudentClass",
    tableName: "student_classes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        grade: {
            type: 'decimal',
            precision: 5,
            scale: 2,
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
})