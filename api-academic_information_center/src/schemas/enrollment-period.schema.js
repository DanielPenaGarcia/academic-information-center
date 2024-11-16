import { EntitySchema } from "typeorm";
import { EnrollmentPeriod } from "../entities/enrollment-period.entity.js";

export const EnrollmentPeriodSchema = new EntitySchema({
    name: 'EnrollmentPeriod',
    tableName: 'enrollment_periods',
    target: EnrollmentPeriod,
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
        startDate: {
            name: 'start_date',
            type: 'date',
            nullable: false
        },
        endDate: {
            name: 'end_date',
            type: 'date',
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
    }
})