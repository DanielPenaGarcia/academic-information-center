import { EntitySchema } from "typeorm";
import { User } from "../entities/user.entity.js";
import { role } from "../entities/enums/role.enum.js";

export const UserSchema = new EntitySchema({
    name: 'User',
    target: User,
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        email: {
            type: 'varchar',
            length: 255,
            nullable: true,
            unique: true,
        },
        password: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        academicId: {
            type: 'varchar',
            length: 255,
            nullable: true,
            unique: true,
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
    },
    inheritance: {
        column: {
            type: 'enum',
            name: 'role',
            enum: [role.ADMIN, role.TEACHER, role.STUDENT],
            enumName: 'role_enum'
        },
        pattern: 'STI'
    },
})