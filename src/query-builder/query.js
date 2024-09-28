import { QueryException } from "../utils/exceptions/query.exception.js";

export class Query {
    constructor(table, condition = null) {
        this.table = table;
        this.condition = condition;
    }

    get queryString() {
        throw new QueryException('Method must be implemented');
    }
}

export class SelectQuery extends Query {
    constructor(table, condition = null, fields = '*') {
        super(table, condition);
    }

    get queryString() {
        let query = `SELECT ${this.fields} FROM ${this.table}`;
        if (this.condition) {
            query += ` WHERE ${this.condition}`;
        }
        return query;
    }
}