import { QueryBuilder } from "./query-builder/query.builder.js";
import { where } from "./query-builder/condition.builder.js";
const condition = where().equal("id", '1').build();

const selectQuery = QueryBuilder()
  .select("users")
  .fields(["id", "username"])
  .where(condition)
  .limit(1)
  .offset(0)
  .build();

console.log(selectQuery.toString()); //Expected output: SELECT id, username FROM users WHERE id = 1 AND (username = Jhon OR username = Doe)

const insertQuery = QueryBuilder()
  .insert("users")
  .fields(["id", "username"])
  .values([[1, "Jhon"]])
  .build();

console.log(insertQuery.toString()); //Expected output: INSERT INTO users (id, username) VALUES (1, Jhon)

const deleteQuery = QueryBuilder().delete("users").where(condition).build();

console.log(deleteQuery.toString()); //Expected output: DELETE FROM users WHERE id = 1 AND (username = Jhon OR username = Doe)

const updateQuery = QueryBuilder()
  .update("users")
  .setValues({ column: "username", value: "daniel" })
  .condition(condition)
  .build();

console.log(updateQuery.toString()); //Expected output: UPDATE users SET username = daniel WHERE id = 1 AND (username = Jhon OR username = Doe)
