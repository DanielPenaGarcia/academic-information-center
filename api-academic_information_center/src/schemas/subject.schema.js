import { EntitySchema } from "typeorm";
import { Subject } from "../entities/subject.entity.js";

export const SubjectSchema = new EntitySchema({
    name: 'Subject',
    tableName: 'subjects',
    target: Subject,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        hoursPerWeek: {
            name: 'hours_per_week',
            type: 'int',
            nullable: false
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            createDate: true
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            updateDate: true
        }
    },
    relations: {
        CourseMap: {
            target: 'CourseMap',
            type: 'many-to-one',
            joinColumn: {
                name: 'course_map_id',
                referencedColumnName: 'id'
            },
            cascade: true,
        },
        Teachers: {
            target: 'Teacher',
            type: 'many-to-many',
            joinTable: {
                name: 'subjects_teachers',
                joinColumn: {
                    name: 'subject_id',
                    referencedColumnName: 'id'
                },
                inverseJoinColumn: {
                    name: 'teacher_id',
                    referencedColumnName: 'id'
                }
            },
        }
    }
})