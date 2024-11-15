import { EntitySchema } from "typeorm";

export const TeacherSubject = new EntitySchema({
    name: 'TeacherSubject',
    tableName: 'teacher_subjects',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        }
    },
    relations: {
        teacherId: {
            target: 'Teacher',
            type: 'many-to-one',
            joinColumn: {
                name: 'teacher_id'
            },
            cascade: true,
        },
        subjectId: {
            target: 'Subject',
            type: 'many-to-one',
            joinColumn: {
                name: 'subject_id'
            },
            cascade: true,
        }
    }
});