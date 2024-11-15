import { EntitySchema } from "typeorm";

export const EnrollmentAppointment = new EntitySchema({
    name: "EnrollmentAppointment",
    tableName: "enrollment_appointments",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        startDateTime: {
            type: 'timestamp',
            name: 'start_date_time',
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
        enrollmentPeriod: {
            target: "EnrollmentPeriod",
            type: "many-to-one",
            joinColumn: {
                name: 'enrollment_period_id',
            },
        },
        student: {
            target: "Student",
            type: "many-to-one",
            joinColumn: {
                name: 'student_id',
            },
        },
    }
});