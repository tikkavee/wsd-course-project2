import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
    sql = postgres({
        host: "cornelius.db.elephantsql.com",
        database: "jxivvtvl",
        username: "jxivvtvl",
        password: "9OaJJOze-JPuxDG3cNifl2FC0hr_5zRZ",
        port: 5432,
        max: 2, // use at most 2 concurrent connections
      });
}

export { sql };