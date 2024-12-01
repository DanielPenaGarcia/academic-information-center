import { EntitySchema } from "typeorm";
import { StudentClass } from "../entities/student-class.entity.js";
import { StatusClass } from "../entities/enums/status-class.enum.js";

export const StudentClassSchema = new EntitySchema({
    name: 'StudentClass',
    tableName: 'student_classes',
    target: StudentClass,
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        status: {
            type: 'enum',
            enum: [StatusClass.APPROVED, StatusClass.PENDING, StatusClass.REJECTED, StatusClass.CANCELED],
            default: StatusClass.PENDING,
            nullable: false,
            name: 'status'
        },
        grade: {
            type: 'decimal',
            nullable: true,
            precision: 5,
            scale: 2
        },
        feedback: {
            type: 'varchar',
            nullable: true
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
        student: {
            target: 'User',
            type: 'many-to-one',
            joinColumn: {
                name: 'student_id',
                referencedColumnName: 'id'
            }
        },
        klass: {
            target: 'Klass',
            type: 'many-to-one',
            joinColumn: {
                name: 'class_id',
                referencedColumnName: 'id'
            }
        }
    }
})