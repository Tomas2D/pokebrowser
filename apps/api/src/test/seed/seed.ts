import * as fs from "fs";
import { Knex } from "knex";
import * as path from "path";

export async function seedDatabase(knex: Knex) {
  const sql = await fs.promises.readFile(path.join(__dirname, "/db.sql"));
  await knex.raw(sql.toString());
}
