import { EntitySchema } from "typeorm";

export const SubjectRequirement = new EntitySchema({
    name: 'SubjectRequirement',
    tableName: 'subject_requirements',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        }
    },
    relations: {
        subjectId: {
            target: 'Subject',
            type: 'many-to-one',
            joinColumn: {
                name: 'subject_id'
            },
            cascade: true,
        },
        subjectRequirementId: {
            target: 'Subject',
            type: 'many-to-one',
            joinColumn: {
                name: 'subject_requirement_id'
            },
            cascade: true,
        }
    }
});