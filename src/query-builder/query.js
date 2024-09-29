import { QueryException } from "../utils/exceptions/query.exception.js";
import { formatValuesInsert } from "../utils/queries/array-values-insert.js";
import { formatValuesUpdate } from "../utils/queries/array-values-update.js";
import { conditionsStringParser } from "../utils/query-strings/conditions-string.js";

export class Query {
  constructor(table) {
    this.table = table;
  }

  toString() {
    throw new QueryException("Must be implemented by subclass");
  }
}

export class SelectQuery extends Query {
  constructor(fields = "*", table, conditions, limit = null, offset = null) {
    super(table);
    this.fields = Array.isArray(fields) ? fields.join(", ") : fields;
    this.conditions = conditions;
    this.limit = limit;
    this.offset = offset;
  }

  toString() {
    const parsedConditions = conditionsStringParser(this.conditions, true);
    let query = `SELECT ${this.fields} FROM ${this.table}`;
    
    // Agregar condiciones (si las hay)
    if (parsedConditions) {
      query += ` ${parsedConditions}`;
    }

    // Agregar paginación (limit y offset)
    if (this.limit !== null) {
      query += ` LIMIT ${this.limit}`;
    }
    if (this.offset !== null && this.limit !== null) {
      query += ` OFFSET ${this.offset}`;
    }

    return query;
  }
}

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