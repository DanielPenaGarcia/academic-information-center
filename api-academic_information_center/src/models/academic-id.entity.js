import { EntitySchema } from "typeorm";

export const entity = new EntitySchema({
    name: "AcademicId",
    tableName: "academic_ids",
    columns: {
        academicId: {
            type: 'varchar',
            primary: true,
            generated: false,
            name: 'academic_id',
        },
    }
})