import { where } from "../query-builder/condition.builder";
import { QueryBuilder } from "../query-builder/query.builder";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy";
import { QueryBuilderException } from "../utils/exceptions/query-builder.exception";
import { ConditionBuilderException } from "../utils/exceptions/condition-builder.exception";
export class SubjectRepository extends RepositoryStrategy {
    
    constructor() {
        super();
        this.table = RepoStrategy.SUBJECT;
    }

    async find(object) {
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

        if (object.joins){
            
            query.joinTable(object.joins);
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

        if (object.fields) {
            query.fields(object.fields);
        }

        if (object.values) {
            query.values(object.values);
        }

        try {
            let result = query.build().toString();
            console.log(result);
        } catch (error) {
            QueryBuilderException(error.message);
        }
        
    }

    async update(object) {
        let query = QueryBuilder().update(this.table);

        if (object.fields) {
            query.fields(object.fields);
        }

        if (object.values) {
            query.values(object.values);
        }

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

    async delete(object) {
        let query = QueryBuilder().delete(this.table);

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