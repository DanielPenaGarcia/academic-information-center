import { EntitySchema } from "typeorm";

export const CourseMaps = new EntitySchema({
    name: 'CourseMaps',
    tableName: 'course_maps',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        semesters: {
            type: 'int',
        },
        year: {
            type: 'int',
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