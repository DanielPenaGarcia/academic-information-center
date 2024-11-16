import { EntitySchema } from "typeorm";
import { CourseMap } from "../entities/course-map.entity.js";

export const CourseMapSchema = new EntitySchema({
    name: 'CourseMap',
    tableName: 'course_maps',
    target: CourseMap,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
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
        },
        year: {
            type: 'int'
        },
        semesters: {
            type: 'int',
        }
    },
})