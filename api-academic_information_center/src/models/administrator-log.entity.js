import { EntitySchema } from "typeorm";

export const AdministratorLog = new EntitySchema({
    name: "AdministratorLog",
    tableName: "administrator_logs",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        action: {
            type: 'varchar',
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
        administrator: {
            target: "Administrator",
            type: "many-to-one",
            joinColumn: {
                name: 'administrator_id',
            },
        },
    }
});