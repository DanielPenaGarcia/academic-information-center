import { where } from "../query-builder/condition.builder";
import { QueryBuilder } from "../query-builder/query.builder";
import { QueryBuilderException } from "../utils/exceptions/query-builder.exception";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy";

export class StudentRepository extends RepositoryStrategy{

    constructor() {
        super();
        this.table = RepoStrategy.STUDENT;
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
            //Inners must be an array of objects
            query.joinTable(object.joins);
        }
        if (object.limit){
            //Limit must be a number
            query.limit(object.limit);
        }
        if (object.limit && object.offset){
            //Offset must be a number
            query.offset(object.offset);
        }
        query.build();

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

        if(object.joins){
            query.joinTable(object.joins);
        }

        try {
            let result =  query.build().toString();
            console.log(result);
        } catch (error) {
            QueryBuilderException(error.message);
        }
        
    }

    async create(object){
        const fields = [`${this.table}.email`, `${this.table}.password`, `${this.table}.academic_id`,`${this.table}.photo`,`${this.table}.names`,`${this.table}.father_last_name` ,`${this.table}.mother_last_name`,`${this.table}.created_at`];
        const values = [object.email, object.password, object.academic_id, object.photo, object.names, object.father_last_name, object.mother_last_name, object.created_at];
        let query = QueryBuilder().insert(this.table).values(object).build();
        try {
            let result = query.toString();
            console.log(result);
        } catch (error) {
            QueryBuilderException(error.message);
        }
    }

    async update(object){
        let condition = where().equal(`${this.table}.id`, object.id).build();
        let query = QueryBuilder().update(this.table).set(object).conditions(condition).build();
        try {
            let result = query.toString();
            console.log(result);
        } catch (error) {
            QueryBuilderException(error.message);
        }
    }

    async delete(object){
        let condition = where().equal(`${this.table}.id`, object.id).build();
        let query = QueryBuilder().delete(this.table).conditions(condition).build();
        try {
            let result = query.toString();
            console.log(result);
        } catch (error) {
            QueryBuilderException(error.message);
        }
    }

}