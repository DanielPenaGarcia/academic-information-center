import { where } from "../query-builder/condition.builder.js";
import { QueryBuilder } from "../query-builder/query.builder.js";
import { QueryBuilderException } from "../utils/exceptions/query-builder.exception.js";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy.js";
import { connection } from "../configs/database.config.js";


connection;


export class ClassRepository extends RepositoryStrategy {
    constructor() {
        super();
        this.table = RepoStrategy.CLASS;
        this.connection = connection;

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
        let query = QueryBuilder().insert(this.table);
        
        if (object.fields && object.values) {
            query.fields(object.fields).values(object.values);
        }
        
        const [result] = await this.connection.execute(query.build().toString());
        return result;
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
        return result; 
    }
    
    async delete(object) {
        let query = QueryBuilder().delete(this.table);
        if (object.conditions){
            query.conditions(object.conditions);
        }
        const [result] = await this.connection.execute(query.build().toString());
        return result;
    }
    
}