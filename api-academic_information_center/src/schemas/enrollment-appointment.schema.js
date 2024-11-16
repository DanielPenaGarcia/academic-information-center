import { EntitySchema } from "typeorm";
import { EnrollmentAppoinment } from "../entities/enrollment-appoinment.entity.js";

export const EnrollmentAppointmentSchema = new EntitySchema({
    name: 'EnrollmentAppointment',
    tableName: 'enrollment_appointments',
    target: EnrollmentAppoinment,
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
        EnrollmentPeriod: {
            target: 'EnrollmentPeriod',
            type: 'many-to-one',
            joinColumn: {
                name: 'enrollment_period_id',
                referencedColumnName: 'id'
            },
            cascade: true,
        },
        Student: {
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