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
        if (object.fields) {
            //Fields must be an array of strings or a string
            query.fields(object.fields);
        }
        if (object.conditions){
            //Conditions must be an array of objects
            query.conditions(object.conditions);
        }
        if (object.joins){
            //Joins must be an array of objects
            object.joins.forEach(join => {
                query.joinTable(join.table, join.type, join.field, join.fields, join.fields, join.fieldNameReference);
            });
        }
        if (object.limit){
            //Limit must be a number
            query.limit(object.limit);
        }
        if (object.limit && object.offset){
            //Offset must be a number
            query.offset(object.offset);
        }
        console.log(query.build().toString());
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