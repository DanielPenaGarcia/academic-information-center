import { QueryException } from "../utils/exceptions/query.exception.js";
import { formatValuesInsert } from "../utils/queries/array-values-insert.js";
import { formatValuesUpdate } from "../utils/queries/array-values-update.js";
import { conditionsStringParser } from "../utils/query-strings/conditions-string.js";
import { innerStringParser } from "../utils/query-strings/inners-string.js";

export class Query {
  constructor(table) {
    this.table = table;
  }

  toString() {
    throw new QueryException("Must be implemented by subclass");
  }
}

export class SelectQuery extends Query {
  constructor(fields, table, conditions, limit = null, offset = null, innerQueries = []) {
    super(table);
    this.fields = this.readFields(fields, table);  // Leer campos de la tabla principal
    this.conditions = conditions;
    this.limit = limit;
    this.offset = offset;
    this.innerQueries = innerQueries;
    this.readInnerQueries(innerQueries);  // Leer campos de las tablas relacionadas (joins)
  }

  // Método para leer los campos de la tabla principal
  readFields(fields, table) {
    if (fields.length === 0) {
      return `${table}.*`;
    }
    return fields.map((field) => `${table}.${field}`).join(", ");
  }

  // Método para leer y concatenar los campos de los inner queries (joins)
  readInnerQueries(innerQueries) {
    if (innerQueries.length > 0) {
      const fieldsInnerQueries = innerQueries.map((innerQuery) => innerQuery.fields.join(", "));
      this.fields = `${this.fields}, ${fieldsInnerQueries.join(", ")}`;
    }
  }

  toString() {
    const parsedConditions = conditionsStringParser(this.conditions, true);
    let query = `SELECT ${this.fields} FROM ${this.table}`;

    // Agregar los inner joins (si los hay)
    if (this.innerQueries.length > 0) {
      query += " " + this.innerQueries.map(innerQuery => innerQuery.toString()).join(" ");
    }

    // Agregar las condiciones (WHERE)
    if (parsedConditions) {
      query += ` ${parsedConditions}`;
    }

    // Agregar paginación (LIMIT y OFFSET)
    if (this.limit !== null) {
      query += ` LIMIT ${this.limit}`;
    }
    if (this.offset !== null && this.limit !== null) {
      query += ` OFFSET ${this.offset}`;
    }

    return query;
  }
}

export class JoinQuery extends Query {
  constructor(table, innerTable, type = "INNER", tableField, selectFields = [], fieldNameReference) {
    super(table);
    this.innerTable = innerTable;
    this.type = type;
    this.tableField = tableField;
    this.selectFields = selectFields;
    this.fieldNameReference = fieldNameReference;
  }

  // Método para obtener los campos de la tabla relacionada (join)
  get fields() {
    return this.selectFields.map((field) => `${this.innerTable}.${field}`);
  }

  // Método para construir el join
  toString() {
    return `${this.type} JOIN ${this.innerTable} ON ${this.table}.${this.tableField} = ${this.innerTable}.${this.fieldNameReference}`;
  }
}

export const JoinTypes = Object.freeze({
  INNER: "INNER",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  FULL: "FULL",
});

export class InsertQuery extends Query {
  constructor(table, fields, values) {
    super(table);
    //Fields must be an array of strings
    this.fields = fields;
    //Values could be an array of arrays of values
    this.values = values;
  }

  get fieldsString() {
    return this.fields.join(", ");
  }

  get valuesString() {
    return formatValuesInsert(this.values);
  }

  toString() {
    return `INSERT INTO ${this.table} (${this.fieldsString}) VALUES ${this.valuesString}`;
  }
}

export class DeleteQuery extends Query {
  constructor(table, conditions) {
    super(table);
    this.conditions = conditions;
  }

  toString() {
    const parsedConditions = conditionsStringParser(this.conditions);
    let query = `DELETE FROM ${this.table}`;
    if (parsedConditions) {
      query += ` ${parsedConditions}`;
    }
    return query;
  }
}

export class UpdateQuery extends Query {
  constructor(table, values, conditions) {
    super(table);
    this.values = values;
    this.conditions = conditions;
  }

  get valuesString() {
    return formatValuesUpdate(this.values);
  }

  toString() {
    const parsedConditions = conditionsStringParser(this.conditions, true);
    let query = `UPDATE ${this.table} SET ${this.valuesString}`;
    if (parsedConditions) {
      query += ` ${parsedConditions}`;
    }
    return query;
  }
}