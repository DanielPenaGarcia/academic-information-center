import { QueryBuilderException } from "../utils/exceptions/query-builder.exception.js";
import { DeleteQuery, InsertQuery, JoinQuery, SelectQuery, UpdateQuery } from "./query.js";

export const QueryBuilder = function () {
  return {
    select: function (table) {
      return new SelectQueryBuilder(table);
    },
    insert: function (table) {
      return new InsertQueryBuilder(table);
    },
    delete: function (table) {
      return new DeleteQueryBuilder(table);
    },
    update: function (table) {
      return new UpdateQueryBuilder(table);
    },
  };
};

export const SelectQueryBuilder = function (tableName) {
  if (!tableName) {
    throw new QueryBuilderException("Table must be defined");
  }

  let fields = [];
  let conditions = [];
  let table = tableName;
  let limit = null;
  let offset = null;
  let innerQueries = [];

  return {
    fields: function (fieldInput) {
      if (typeof fieldInput === "string") {
        fields.push(fieldInput);
      }
      if (Array.isArray(fieldInput)) {
        Array.prototype.push.apply(fields, fieldInput);
      }
      return this;
    },
    conditions: function (conditionInput) {
      conditions = conditionInput;
      return this;
    },
    limit: function (limitInput) {
      limit = limitInput;
      return this;
    },
    offset: function (offsetInput) {
      offset = offsetInput;
      return this;
    },
    joinTable: function (joinTable, type, field, selectFields = [], fieldNameReference) {
      const innerQuery = new JoinQuery(table, joinTable, type, field, selectFields, fieldNameReference);
      innerQueries.push(innerQuery);
      return this;
    },
    build: function () {
      return new SelectQuery(fields, table, conditions, limit, offset, innerQueries);
    },
  };
};

export const InsertQueryBuilder = function (tableName) {
  if (!tableName) {
    throw new QueryBuilderException("Table must be defined");
  }

  let fields = [];
  let values = [];
  let table = tableName;

  return {
    fields: function (field) {
      if (typeof field === "string") {
        fields.push(field);
      }
      if (Array.isArray(field)) {
        Array.prototype.push.apply(fields, field);
      }
      return this;
    },
    values: function (value) {
      if (!(value instanceof Array)) {
        throw new QueryBuilderException("Values must be an array");
      }
      Array.prototype.push.apply(values, value);
      return this;
    },
    build: function () {
      return new InsertQuery(table, fields, values);
    },
  };
};

export const DeleteQueryBuilder = function (tableName) {
  if (!tableName) {
    throw new QueryBuilderException("Table must be defined");
  }

  let conditions = [];
  let table = tableName;

  return {
    conditions: function (conditionInput) {
      conditions = conditionInput;
      return this;
    },
    build: function () {
      return new DeleteQuery(table, conditions);
    },
  };
};

export const UpdateQueryBuilder = function (tableName) {
  if (!tableName) {
    throw new QueryBuilderException("Table must be defined");
  }
  let values = [];
  const table = tableName;
  let conditions = [];

  return {
    setValues: function (valuesInput) {
      if (valuesInput instanceof Array) {
        Array.prototype.push.apply(values, valuesInput);
      } else if (valuesInput instanceof Object) {
        values.push(valuesInput);
      } else {
        throw new QueryBuilderException(
          "Values must be an object or an array of objects"
        );
      }
      return this;
    },
    conditions: function (conditionInput) {
      conditions = conditionInput;
      return this;
    },
    build: function () {
      return new UpdateQuery(table, values, conditions);
    },
  };
};
