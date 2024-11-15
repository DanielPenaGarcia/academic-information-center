import { EntitySchema } from "typeorm";

export const EnrollmentPeriod = new EntitySchema({
    name: "EnrollmentPeriod",
    tableName: "enrollment_periods",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: 'varchar',
        },
        startDate: {
            type: 'date',
            name: 'start_date',
        },
        endDate: {
            type: 'date',
            name: 'end_date',
        },
    },
});