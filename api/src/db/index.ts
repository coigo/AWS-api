import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
  
console.log(process.env["DATABASE_URL"])

const poolConnection = mysql.createPool({
    uri:process.env["DATABASE_URL"]
});
export const db = drizzle({ client: poolConnection });
