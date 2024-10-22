import { connection } from "../configs/database.config.js";
import { QueryBuilder } from "../query-builder/query.builder.js";
import { QueryBuilderException } from "../utils/exceptions/query-builder.exception.js";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy.js";

export class StudentRepository extends RepositoryStrategy{

    constructor() {
        super();
        this.table = RepoStrategy.STUDENT;
        this.connection = connection;
    }

    async find(){
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
        const [result] = await this.connection.execute(query.build().toString());
        return result;  // Devuelve el resultado de la ejecución de la query

    }

    async findById(id, object){
        let condition = where().equal(`${this.table}.id`, id).build();
        let query = QueryBuilder().select(this.table).conditions(condition);
        
        if(object.fields){
            query.fields(object.fields);
        }

        if(object.limit){
            query.limit(object.limit);
        }

        if(object.offset){
            query.offset(object.offset);
        }

        if (object.joins){
            //Joins must be an array of objects
            object.joins.forEach(join => {
                query.joinTable(join.table, join.type, join.field, join.fields, join.fields, join.fieldNameReference);
            });
        }

        try {
            const [result] = await this.connection.execute(query.build().toString());
            return result[0];  // Devuelve el resultado de la ejecución de la query
        } catch (error) {
            QueryBuilderException(error.message);
        }
        
    }

    async create(object){
        let query = QueryBuilder().insert(this.table);
        if (object.fields) {
            query.fields(object.fields);
        }
        if (object.values) {
            query.values(object.values);
        }

        try {
            const [result] = await this.connection.execute(query.build().toString());
            return result;  // Devuelve el resultado de la ejecución de la query
        } catch (error) {
            QueryBuilderException(error.message);
    }

}

    async update(object){
        let query = QueryBuilder().update(this.table);
        if (object.setValues){
            query.set(object.setValues);
        }
        if (object.conditions){
            query.conditions(object.conditions);
        }

        try {
            const [result] = await this.connection.execute(query.build().toString());
            return result;  // Devuelve el resultado de la ejecución de la query
        } catch (error) {
            QueryBuilderException(error.message);
        }
    }

    async delete(object){
        let query = QueryBuilder().delete(this.table);
        if (object.conditions){
            query.conditions(object.conditions);
        }

        try {
            const [result] = await this.connection.execute(query.build().toString());
            return result;  // Devuelve el resultado de la ejecución de la query
        } catch (error) {
            QueryBuilderException(error.message);
        }
    }

}