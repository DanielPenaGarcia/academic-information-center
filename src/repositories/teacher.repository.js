import { where } from "../query-builder/condition.builder";
import { QueryBuilder } from "../query-builder/query.builder";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy";

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

    async findById(id, object) {
        let condition = where().equal('id', id);
        let query = QueryBuilder().select(this.table).conditions(condition);
        // Implement findById method
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