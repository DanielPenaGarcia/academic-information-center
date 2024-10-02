import { where } from "../query-builder/condition.builder.js";
import { QueryBuilder } from "../query-builder/query.builder.js";
import { RepositoryStrategy, RepoStrategy } from "./repository-strategy/repository-strategy.js";

export class EnrollmentPeriodRepository extends RepositoryStrategy{

    constructor(){
        super();
        this.table = RepoStrategy.ENROLLMENT_PERIOD;
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
        console.log(query.build());
        // Implement findById method
    }

    async create(object) {
        // Implement create method
        let query = QueryBuilder().insert(this.table).fields(Object.keys(object)).values(Object.values(object));
        console.log(query.build().toString());
    }

    async update(object) {
        // Implement update method
        let query = QueryBuilder.update(this.table).setValues(object);
        console.log(query.build());
    }

    async delete(object) {
        // Implement delete method
        let condition = where().equal(Object.keys(object),Object.values(object));
        let query = QueryBuilder.delete(this.table).where(object);
        console.log(query.build());
    }
}