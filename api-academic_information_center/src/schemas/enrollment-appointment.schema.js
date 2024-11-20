import { EntitySchema } from "typeorm";
import { EnrollmentAppoinment } from "../entities/enrollment-appoinment.entity.js";

export const EnrollmentAppoinmentSchema = new EntitySchema({
    name: 'EnrollmentAppoinment',
    target: EnrollmentAppoinment,
    tableName: 'enrollment_appointments',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        startDateTime: {
            name: 'start_time',
            type: 'time',
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
        enrollmentPeriod: {
            target: 'EnrollmentPeriod',
            type: 'many-to-one',
            joinColumn: {
                name: 'enrollment_period_id',
                referencedColumnName: 'id'
            },
            cascade: true,
        },
        student: {
            target: 'Student',
            type: 'many-to-one',
            joinColumn: {
                name: 'student_id',
                referencedColumnName: 'id'
            },
            cascade: true,
        },
    }
});