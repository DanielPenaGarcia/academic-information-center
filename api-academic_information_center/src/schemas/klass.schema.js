import { EntitySchema } from "typeorm";
import { Klass } from "../entities/klass.entity.js";

export const ClassSchema = new EntitySchema({
    name: 'Class',
    tableName: 'classes',
    target: Klass,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        startTime: {
            name: 'start_time',
            type: 'time',
            nullable: false
        },
        duration: {
            type: 'int',
            nullable: false
        },
        days: {
            type: 'varchar',
            length: 255,
            nullable: false,
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
        Subject: {
            target: 'Subject',
            type: 'many-to-one',
            joinColumn: {
                name: 'subject_id',
                referencedColumnName: 'id'
            },
            cascade: true,
        },
        Teacher: {
            target: 'Teacher',
            type: 'many-to-one',
            joinColumn: {
                name: 'teacher_id',
                referencedColumnName: 'id'
            },
        }
    }
});