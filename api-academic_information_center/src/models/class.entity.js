import { EntitySchema } from "typeorm";

export const Klass = new EntitySchema({
    name: "Class",
    tableName: "classes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        startTime: {
            type: 'varchar',
        },
        duration: {
            type: 'int',
        },
        days: {
            type: 'varchar',
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
        },
        updatedAt: {
            type: 'timestamp',
            updateDate: true,
        },
    },
})