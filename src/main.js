import { where } from "./query-builder/condition.builder.js";
import { conditionsStringParser } from "./utils/query-strings/conditions-string.js";

const condition = where()
  .equal("id", 1)
  .and(where().equal("name", "Jhon").and().notEqual('lastname', 'Peña').build())
  .and()
  .like("email", "gmail.com")
  .build();

console.log(conditionsStringParser(condition)); // WHERE id = 1 AND ( name = Jhon AND lastname != Peña )
