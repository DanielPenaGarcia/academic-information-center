import { EntitySchema } from "typeorm";
import { role } from "../entities/enums/role.enum.js";
import { Student } from "../entities/student.entity.js";

export const StudentSchema = new EntitySchema({
    name: 'Student',
    tableName: 'students',
    target: Student,
    type: 'entity-child',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        names: {
            type: 'varchar',
            length: 100
        },
        fatherLastName: {
            type: 'varchar',
            length: 100,
            name: 'father_last_name'
        },
        motherLastName: {
            type: 'varchar',
            length: 100,
            name: 'mother_last_name'
        }
    },
    discriminatorValue: role.STUDENT
});