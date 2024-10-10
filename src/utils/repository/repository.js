import { connection } from "../../configs/database.config.js";
import { where } from "../../query-builder/condition.builder.js";
import { QueryBuilder } from "../../query-builder/query.builder.js";
import { RepositoryException } from "../exceptions/repository.exception.js";

/**
 * Repository class
 *
 * Provides high-level methods to perform CRUD operations and database queries.
 */
export class Repository {
  /**
   * @param {string} table - The name of the table in the database.
   */
  constructor(table) {
    this.table = table;
    this.connection = connection;
  }

  /**
   * Finds multiple records based on the provided search criteria.
   *
   * @param {Object} object - Object containing fields, conditions, joins, limit, and offset.
   * @returns {Promise<Array>} - Query results.
   * @throws {RepositoryException} - If an error occurs while executing the query.
   */
  async find(object) {
    let query = QueryBuilder().select(this.table);
    if (object.fields) {
      query.fields(object.fields);
    }
    if (object.conditions) {
      query.conditions(object.conditions);
    }
    if (object.joins) {
      object.joins.forEach((join) => {
        query.joinTable(
          join.table,
          join.type,
          join.field,
          join.fields,
          join.fields,
          join.fieldNameReference
        );
      });
    }
    if (object.limit) {
      query.limit(object.limit);
    }
    if (object.limit && object.offset >= 0) {
      query.offset(object.offset);
    }

    try {
      const [result] = await this.connection.execute(query.build().toString());
      return result;
    } catch (error) {
      throw new RepositoryException(
        "Error occurred while executing the 'find' query.",
        error
      );
    }
  }

  /**
   * Finds a single record based on the provided search criteria.
   *
   * @param {Object} object - Object containing fields, conditions, and joins.
   * @returns {Promise<Object>} - The first found record.
   * @throws {RepositoryException} - If an error occurs while executing the query.
   */
  async findOne(object) {
    let query = QueryBuilder().select(this.table);
    if (object.fields) {
      query.fields(object.fields);
    }
    if (object.conditions) {
      query.conditions(object.conditions);
    }
    if (object.joins) {
      object.joins.forEach((join) => {
        query.joinTable(
          join.table,
          join.type,
          join.field,
          join.fields,
          join.fields,
          join.fieldNameReference
        );
      });
    }

    try {
      const [result] = await this.connection.execute(query.build().toString());
      return result[0];
    } catch (error) {
      throw new RepositoryException(
        "Error occurred while executing the 'findOne' query.",
        error
      );
    }
  }

  /**
   * Finds a record by its ID.
   *
   * @param {number|string} id - The ID of the record.
   * @param {Object} object - Object containing fields, conditions, and joins.
   * @returns {Promise<Object>} - The found record.
   * @throws {RepositoryException} - If an error occurs while executing the query.
   */
  async findOneById(id, object = {}) {
    let condition = where().equal(`${this.table}.id`, id).build();
    let query = QueryBuilder().select(this.table).conditions(condition);
    if (object.fields) {
      query.fields(object.fields);
    }
    if (object.conditions) {
      query.conditions(object.conditions);
    }
    if (object.joins) {
      object.joins.forEach((join) => {
        query.joinTable(
          join.table,
          join.type,
          join.field,
          join.fields,
          join.fields,
          join.fieldNameReference
        );
      });
    }

    try {
      const [result] = await this.connection.execute(query.build().toString());
      return result[0];
    } catch (error) {
      throw new RepositoryException(
        `Error occurred while finding ${this.table} by ID: ${error.message}`,
        error
      );
    }
  }

  /**
   * Creates a new record in the database.
   *
   * @param {Object} object - Object containing fields and values.
   * @returns {Promise<Object>} - Insert result.
   * @throws {RepositoryException} - If an error occurs while executing the query.
   */
  async create(object) {
    let query = QueryBuilder().insert(this.table);
    if (object.fields) {
      query.fields(object.fields);
    }
    if (object.values) {
      query.values(object.values);
    }
    try {
      const [result] = await this.connection.execute(query.build().toString());
      return result;
    } catch (error) {
      throw new RepositoryException(
        `Error occurred while creating in ${this.table}: ${error.message}`,
        error
      );
    }
  }

  /**
   * Updates records in the database based on the provided conditions.
   *
   * @param {Object} object - Object containing values to update and conditions.
   * @returns {Promise<Object>} - Update result.
   * @throws {RepositoryException} - If an error occurs while executing the query.
   */
  async update(object) {
    let query = QueryBuilder().update(this.table);
    if (object.setValues) {
      query.setValues(object.setValues);
    }
    if (object.conditions) {
      query.conditions(object.conditions);
    }

    try {
      const [result] = await this.connection.execute(query.build().toString());
      return result;
    } catch (error) {
      throw new RepositoryException(
        "Error occurred while updating records.",
        error
      );
    }
  }

  /**
   * Deletes records from the database based on the provided conditions.
   *
   * @param {Object} object - Object containing deletion conditions.
   * @returns {Promise<Object>} - Deletion result.
   * @throws {RepositoryException} - If an error occurs while executing the query.
   */
  async delete(object) {
    let query = QueryBuilder().delete(this.table);
    if (object.conditions) {
      query.conditions(object.conditions);
    }

    try {
      const [result] = await this.connection.execute(query.build().toString());
      return result;
    } catch (error) {
      throw new RepositoryException(
        "Error occurred while deleting records.",
        error
      );
    }
  }
}

export const RepositoryTable = Object.freeze({
  TEACHER: "teachers",
  REVIEW: "reviews",
  SUBJECT: "subjects",
  STUDENT: "students",
  ENROLLMENT_PERIOD: "enrollment_period",
  ENROLLMENT_APPOINTMENT: "enrollment_appointment",
  COURSEMAP: "courses_map",
  CLASS: "classes",
});
