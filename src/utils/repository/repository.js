import { connection } from "../../configs/database.config.js";
import { where } from "../../query-builder/condition.builder.js";
import { QueryBuilder } from "../../query-builder/query.builder.js";
import { RepositoryException } from "../exceptions/repository.exception.js";

/**
 * Clase Repository
 *
 * Proporciona métodos de alto nivel para realizar operaciones CRUD y consultas en la base de datos.
 */
export class Repository {

  /**
   * @param {string} table - El nombre de la tabla en la base de datos.
   */
  constructor(table) {
    this.table = table;
    this.connection = connection;
  }

  /**
   * Encuentra múltiples registros según los criterios de búsqueda proporcionados.
   *
   * @param {Object} object - Objeto que contiene campos, condiciones, joins, límite y desplazamiento.
   * @returns {Promise<Array>} - Resultados de la consulta.
   * @throws {RepositoryException} - Si ocurre un error al ejecutar la consulta.
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
        "Error al ejecutar la consulta de 'find'",
        error
      );
    }
  }

  /**
   * Encuentra un solo registro según los criterios de búsqueda.
   *
   * @param {Object} object - Objeto que contiene campos, condiciones y joins.
   * @returns {Promise<Object>} - El primer registro encontrado.
   * @throws {RepositoryException} - Si ocurre un error al ejecutar la consulta.
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
        "Error al ejecutar la consulta de 'findOne'",
        error
      );
    }
  }

  /**
   * Encuentra un registro por su ID.
   *
   * @param {number|string} id - El ID del registro.
   * @param {Object} object - Objeto que contiene campos, condiciones y joins.
   * @returns {Promise<Object>} - El registro encontrado.
   * @throws {RepositoryException} - Si ocurre un error al ejecutar la consulta.
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
        "Error al ejecutar la consulta de 'findOneById'",
        error
      );
    }
  }

  /**
   * Crea un nuevo registro en la base de datos.
   *
   * @param {Object} object - Objeto que contiene campos y valores.
   * @returns {Promise<Object>} - Resultado de la inserción.
   * @throws {RepositoryException} - Si ocurre un error al ejecutar la consulta.
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
      throw new RepositoryException("Error al crear un nuevo registro", error);
    }
  }

  /**
   * Actualiza registros en la base de datos según las condiciones proporcionadas.
   *
   * @param {Object} object - Objeto que contiene valores a actualizar y condiciones.
   * @returns {Promise<Object>} - Resultado de la actualización.
   * @throws {RepositoryException} - Si ocurre un error al ejecutar la consulta.
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
      throw new RepositoryException("Error al actualizar registros", error);
    }
  }

  /**
   * Elimina registros de la base de datos según las condiciones proporcionadas.
   *
   * @param {Object} object - Objeto que contiene condiciones de eliminación.
   * @returns {Promise<Object>} - Resultado de la eliminación.
   * @throws {RepositoryException} - Si ocurre un error al ejecutar la consulta.
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
      throw new RepositoryException("Error al eliminar registros", error);
    }
  }
}

export const RepositoryTable = Object.freeze({
    TEACHER: 'teachers',
    REVIEW: 'reviews',
    SUBJECT: 'subjects',
    STUDENT: 'students',
    ENROLLMENT_PERIOD: 'enrollment_period',
    ENROLLMENT_APPOINTMENT: 'enrollment_appoinment',
    COURSEMAP: 'courses_map',
    CLASS: 'classes',
});
