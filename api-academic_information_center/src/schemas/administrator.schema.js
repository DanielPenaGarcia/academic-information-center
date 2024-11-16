import { EntitySchema } from "typeorm";
import { Administrator } from "../entities/administrator.entity.js";
import { role } from "../entities/enums/role.enum.js";

export const AdministratorSchema = new EntitySchema({
    name: 'Administrator',
    target: Administrator,
    tableName: 'administrators',
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
        },
        role: {
            type: 'enum',
            enum: role,
            default: role.ADMIN
        }
    },
    discriminatorValue: role.ADMIN
});