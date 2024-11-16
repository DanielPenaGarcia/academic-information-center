import { EntitySchema } from "typeorm";
import { Teacher } from "../entities/teacher.entity.js";
import { role } from "../entities/enums/role.enum.js";

export const TeacherSchema = new EntitySchema({
    name: 'Teacher',
    tableName: 'teachers',
    type: 'entity-child',
    target: Teacher,
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
    discriminatorValue: role.TEACHER
});