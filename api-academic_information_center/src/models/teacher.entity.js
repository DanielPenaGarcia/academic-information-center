import { EntitySchema } from "typeorm";

export const entity = new EntitySchema({
    name: 'Teacher',
    tableName: 'teachers',
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
            name: 'father_last_name',
            type: 'varchar',
            length: 100
        },
        motherLastName: {
            name: 'mother_last_name',
            type: 'varchar',
            length: 100
        },
        email: {
            type: 'varchar',
            length: 100
        },
        password: {
            type: 'varchar',
            length: 100
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
        academicId: {
            target: 'AcademicId',
            type: 'one-to-one',
            joinColumn: {
                name: 'academic_id'
            },
            cascade: true,
        }
    }
})