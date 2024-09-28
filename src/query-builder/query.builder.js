import { QueryBuilderException } from "../utils/exceptions/query-builder.exception.js";

export const QueryBuilder = function () {
    return {
        select: function (fields) {
            return new SelectQueryBuilder();
        }
    }
}

const SelectQueryBuilder = function (fields) {
    if(!fields) {
        throw new QueryBuilderException('Table name is required');
    }
    let fields = [];
    let condition = [];
    let table = null;

    return {
        from: function (table) {
            table = table;
            return this;
        },
        where: function (condition) {
            condition = condition;
            return this;
        },
        build: function () {
            return new SelectQuery(table, condition, fields);
        }
    }
}