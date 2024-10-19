import { where } from "../query-builder/condition.builder.js";
import { QueryBuilder } from "../query-builder/query.builder.js";
import { RepositoryException } from "../exceptions/repository.exception.js";
import { connection } from "../../config/mysql.config.js";

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
  async find({ fields, conditions, joins, limit, offset }) {
    let query = QueryBuilder().select(this.table);
    if (fields) {
      query.fields(fields);
    }
    if (conditions) {
      query.conditions(conditions);
    }
    if (joins) {
      joins.forEach((join) => {
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
    if (limit) {
      query.limit(limit);
    }
    if (offset >= 0) {
      query.offset(offset);
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
  async findOne({ fields, conditions, joins }) {
    let query = QueryBuilder().select(this.table);
    if (fields) {
      query.fields(fields);
    }
    if (conditions) {
      query.conditions(conditions);
    }
    if (joins) {
      joins.forEach((join) => {
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
  async findOneById(id, { fields, conditions, joins } = {}) {
    let condition = where().equal(`${this.table}.id`, id).build();
    let query = QueryBuilder().select(this.table).conditions(condition);
    if (fields) {
      query.fields(fields);
    }
    if (conditions) {
      query.conditions(conditions);
    }
    if (joins) {
      joins.forEach((join) => {
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
  async create({ fields, values }) {
    let query = QueryBuilder().insert(this.table);
    if (fields) {
      query.fields(fields);
    }
    if (values) {
      query.values(values);
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
  async update({ setValues, conditions }) {
    let query = QueryBuilder().update(this.table);
    if (setValues) {
      query.setValues(setValues);
    }
    if (conditions) {
      query.conditions(conditions);
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
  async delete({ conditions }) {
    let query = QueryBuilder().delete(this.table);
    if (conditions) {
      query.conditions(conditions);
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
  ADMINISTRATOR: "administrators",
  REVIEW: "reviews",
  SUBJECT: "subjects",
  STUDENT: "students",
  ENROLLMENT_PERIOD: "enrollment_period",
  ENROLLMENT_APPOINTMENT: "enrollment_appointment",
  COURSEMAP: "course_maps",
  CLASS: "classes",
});
