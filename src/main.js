import { QueryBuilder } from "./query-builder/query.builder.js";
import { where } from "./query-builder/condition.builder.js";
import { JoinTypes } from "./query-builder/query.js";
const condition = where().equal("username", "Jhon Doe").build();

const selectQuery = QueryBuilder()
  .select("users")
  .joinTable("tasks", JoinTypes.INNER, "id", ["*"], "user_id")
  .joinTable("tasks_completed", JoinTypes.INNER, "id", ["completed_at"], "user_id")
  .conditions(condition)
  .build();

console.log(selectQuery.toString());
/**
 * Output:
 * SELECT users.*, tasks.*, tasks_completed.completed_at
 * FROM users
 * INNER JOIN tasks ON users.id = tasks.user_id
 * INNER JOIN tasks_completed ON users.id = tasks_completed.user_id
 * WHERE username = 'Jhon Doe'
 */