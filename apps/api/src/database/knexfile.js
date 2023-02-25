const path = require("path");
const root = path.join(__dirname, "../..");

const dotenv = require("dotenv");
dotenv.config({ path: `${root}/.env` });
dotenv.config({ path: `${root}/.env.${process.env.NODE_ENV}`, override: true });
/* c8 ignore next */
if (process.env.NODE_ENV !== "test") {
  dotenv.config({ path: `${root}/.env.local`, override: true });
}
dotenv.config({
  path: `${root}/.env.${process.env.NODE_ENV}.local`,
  override: true,
});

const { knexSnakeCaseMappers } = require("objection");

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      charset: "utf8mb4",
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    ...knexSnakeCaseMappers(),
  },
  test: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      multipleStatements: true,
      charset: "utf8mb4",
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `src/database/migrations`,
    },
    ...knexSnakeCaseMappers(),
  },
};
