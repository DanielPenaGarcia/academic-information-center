import { QueryBuilderException } from "../utils/exceptions/query-builder.exception.js";
import { DeleteQuery, InsertQuery, SelectQuery, UpdateQuery } from "./query.js";

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

const SelectQueryBuilder = function (tableName) {
  if (!tableName) {
    throw new QueryBuilderException("Table must be defined");
  }

  let fields = [];
  let conditions = [];
  let table = tableName;
  let limit = null;
  let offset = null;

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
    where: function (conditionInput) {
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
    build: function () {
      const selectedFields = fields.length === 0 ? "*" : fields;
      return new SelectQuery(selectedFields, table, conditions, limit, offset);
    },
  };
};

const InsertQueryBuilder = function (tableName) {
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

const DeleteQueryBuilder = function (tableName) {
  if (!tableName) {
    throw new QueryBuilderException("Table must be defined");
  }

  let conditions = [];
  let table = tableName;

  return {
    where: function (conditionInput) {
      conditions = conditionInput;
      return this;
    },
    build: function () {
      return new DeleteQuery(table, conditions);
    },
  };
};

const UpdateQueryBuilder = function (tableName) {
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
    condition: function (conditionInput) {
      conditions = conditionInput;
      return this;
    },
    build: function () {
      return new UpdateQuery(table, values, conditions);
    },
  };
};
