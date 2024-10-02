import { where } from "../query-builder/condition.builder.js";
import { QueryBuilder } from "../query-builder/query.builder.js";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy.js";

export class ReviewRepository extends RepositoryStrategy {
    constructor() {
        super();
        this.table = RepoStrategy.REVIEW;
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
        if (object.limit && object.offset >= 0){
            //Offset must be a number
            query.offset(object.offset);
        }
        return query.build().toString();
    }

    async findById(id, object) {
        let condition = where().equal(`${this.table}.id`, id).build();
        let query = QueryBuilder().select(this.table).conditions(condition);
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
        if (object.limit && object.offset >= 0){
            //Offset must be a number
            query.offset(object.offset);
        }
        return query.build().toString();
    }

    async create(object) {
        // Implement create method
        let query = QueryBuilder().insert(this.table);
        if (object.fields) {
            query.fields(object.fields);
        }
        if (object.values) {
            query.values(object.values);
        }
        return query.build().toString();
    }

    async update(object) {
        let query = QueryBuilder().update(this.table);
        if(object.setValues){
            query.setValues(object.setValues);
        }
        if(object.conditions){
            query.conditions(object.conditions);
        }
        return query.build().toString();
    }

    async delete(object) {
        // Implement delete method
        let query = QueryBuilder().delete(this.table);
        if (object.conditions){
            query.conditions(object.conditions);
        }
        return query.build().toString();
    }
}