import { where } from "../query-builder/condition.builder.js";
import { QueryBuilder } from "../query-builder/query.builder.js";
import { QueryBuilderException } from "../utils/exceptions/query-builder.exception.js";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy.js";


export class ClassRepository extends RepositoryStrategy {
    constructor() {
        super();
        this.table = RepoStrategy.CLASS;
        
    }

    async find() {
        let query = QueryBuilder().select(this.table);
        try {
        query.build();  
        } catch (error) {
            QueryBuilderException(error.message);
            
        }
    }

    async findById(id, object) {
        const condition = where().equal(`${this.table}.id`, id).build();
        let query = QueryBuilder().select(this.table).conditions(condition);
        if(object.fields){
            query.fields(object.fields);
        }
        if(object.limit){
            query.limit(object.limit);
        }

        if (object.joins){
            object.joins.forEach(join =>{
                query.joinTable(join.table,join.type,join.field,joind.fields, join.fieldNameReference);
            });
        }
        try {
            let result = query.build().toString();
            console.log(result);
        } catch (error) {
            QueryBuilderException(error.message);
        }
    }

    async create(object) {

        const fields = [`${this.table}.start_time`, `${this.table}.duration`, `${this.table}.days`, `${this.table}.description` , `${this.table}.created_at`];
        const values = [object.start_time, object.duration, object.days, object.description, new Date().toISOString()];
        let query = QueryBuilder().insert(this.table).fields(fields).values(values);
        try {
            let result = query.build().toString();
            console.log(result);
        } catch (error) {
            throw new QueryBuilderException(error.message);
        }
    }

    async update(id, object) {
        const condition = where().equal(`${this.table}.id`, id).build();
        const fields = object.fields;
        const values = object.values;

        let query=QueryBuilder().update(this.table).setValues({fields, values}).conditions(condition)

        try {
            let result = query.build().toString();
            console.log(result);
        } catch (error) {
            throw new QueryBuilderException(error.message);
        }
    }

    async delete(id, object) {
        const condition = where().equal(`${this.table}.id`, id).build();
        let query = QueryBuilder().delete(this.table).conditions(condition);
        if (object.conditions) {
            query.conditions(object.conditions);
        }
        try {
            let result = query.build().toString();
            console.log(result);
        }
        catch (error) {
            QueryBuilderException(error.message);
        }
    }
}