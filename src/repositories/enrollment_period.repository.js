import { where } from "../query-builder/condition.builder.js";
import { QueryBuilder } from "../query-builder/query.builder.js";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy.js";
import { connection } from "../configs/database.config.js";
export class EnrollmentPeriodRepository extends RepositoryStrategy{

    connection

    constructor(){
        super();
        this.table = RepoStrategy.ENROLLMENT_PERIOD;
        this.connection = connection;
    }

    async find(object) {
        let query = QueryBuilder().select(this.table);
        if (object.fields !== undefined) {
            //Fields must be an array of strings or a string
            query.fields(object.fields);
        }
        if (object.conditions){
            //Conditions must be an array of objects
            query.conditions(object.conditions);
        }
        if (object.joins){
            //Inners must be an array of objects
            object.joins.forEach(join => {
                query.joinTable(join.table, join.type, join.field, join.fields, join.fields, join.fieldNameReference);
            });
        }
        if (object.limit){
            //Limit must be a number
            query.limit(object.limit);
        }
        if (object.limit && object.offset >=0){
            //Offset must be a number
            query.offset(object.offset);
        }

        const [result] = await this.connection.execute(query.build().toString());

        return result;
    }

    async findById(id, object) {
        let condition = where().equal(`${this.table}.id`, id).build();
        let query = QueryBuilder().select(this.table).conditions(condition);
        if (object.fields !== undefined) {
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
        const [result] = await this.connection.execute(query.build().toString());
        return result[0];  // Devuelve el resultado de la ejecución de la query
   
    }

    async create(object) {
        let query = QueryBuilder().insert(this.table);
        if (object.fields) {
            query.fields(object.fields);
        }
        if (object.values) {
            query.values(object.values);
        }
        const [result] = await this.connection.execute(query.build().toString());
        return result;  // Devuelve el resultado de la ejecución de la query
    }

    async update(object) {
        let query = QueryBuilder().update(this.table);
        if(object.setValues){
            query.setValues(object.setValues);
        }
        if(object.conditions){
            query.conditions(object.conditions);
        }
        const [result] = await this.connection.execute(query.build().toString());
        return result;  // Devuelve el resultado de la ejecución de la query
    }

    async delete(object) {
        // Implement delete method
        let query = QueryBuilder().delete(this.table);
        if (object.conditions){
            query.conditions(object.conditions);
        }
        const [result] = await this.connection.execute(query.build().toString());
        return result;  // Devuelve el resultado de la ejecución de la query
    }
}