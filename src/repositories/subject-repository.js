import { where } from "../query-builder/condition.builder";
import { QueryBuilder } from "../query-builder/query.builder";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy";
import { QueryBuilderException } from "../utils/exceptions/query-builder.exception";


export class SubjectRepository extends RepositoryStrategy {
    
    
    constructor() {
        super();
        this.table = RepoStrategy.SUBJECT;
        
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
        const fields = [`${this.table}.name`, `${this.table}.hours_per_week`, `${this.table}.semester`, `${this.table}.created_at`];
        const values = [object.name, object.hoursPerWeek, object.semester, new Date().toISOString()];
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
    
        let query = QueryBuilder().update(this.table).fields(fields).values(values).conditions(condition);
    
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