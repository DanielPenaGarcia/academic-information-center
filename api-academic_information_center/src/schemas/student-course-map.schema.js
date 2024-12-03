import { EntitySchema } from "typeorm";
import { StudentCourseMap } from "../entities/student-course-map.entity.js";

export const StudentCourseMapSchema = new EntitySchema({
    name: 'StudentCourseMap',
    tableName: 'student_course_map',
    target: StudentCourseMap,
    columns: {
        studentId: {
            primary: true,
            type: 'int',
            name: 'student_id',
        },
        courseMapId: {
            type: 'int',
            name: 'course_map_id',
        },
    },
    relations: {
        student: {
            type: 'many-to-one',
            target: 'Student',
            joinColumn: {
                name: 'student_id',
                referencedColumnName: 'id',
            },
        },
        courseMap: {
            type: 'many-to-one',
            target: 'CourseMap',
            joinColumn: {
                name: 'course_map_id',
                referencedColumnName: 'id',
            },
        }
    }
});