import { EntitySchema } from "typeorm";

export const Subject = new EntitySchema({
    name: 'Subject',
    tableName: 'subjects',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            length: 100
        },
        hoursPerWeek: {
            name: 'hours_per_week',
            type: 'int'
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
        courseMapId: {
            target: 'CourseMaps',
            type: 'many-to-one',
            joinColumn: {
                name: 'course_map_id'
            },
            cascade: true,
        }
    }
})