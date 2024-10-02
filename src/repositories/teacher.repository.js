import { where } from "../query-builder/condition.builder.js";
import { QueryBuilder } from "../query-builder/query.builder.js";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy.js";

export class TeacherRepository extends RepositoryStrategy {
    
    constructor() {
        super();
        this.table = RepoStrategy.TEACHER;
    }

    async find(object) {
        let query = QueryBuilder().select(this.table);
        query.build();
    }

    async findById(id, object) {
        let condition = where().equal(`${this.table}.id`, id).build();
        let query = QueryBuilder().select(this.table).conditions(condition);
        if (object.fields) {
            query.fields(object.fields);
        }
        if (object.limit) {
            query.limit(object.limit);
        }
        if (object.offset === 0 && object.limit) {
            query.offset(object.offset);
        }
        if (object.joins) {
            object.joins.forEach(join => {
                query.joinTable(join.table, join.type, join.field, join.fields, join.fieldNameReference);
            });
        }
        let queryResult = query.build().toString();
        console.log(queryResult);
        // Implement connection
    }

    async create(object) {
        // Implement create method
    }

    async update(object) {
        // Implement update method
    }

    async delete(object) {
        // Implement delete method
    }
}