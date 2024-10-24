import mysql from "mysql2/promise";

export const connection = await mysql.createConnection({
  user: "root",
  password: "admin",
  database: "academic_information_center",
  host: "localhost",
  port: 3306,
});
