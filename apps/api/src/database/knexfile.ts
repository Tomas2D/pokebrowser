const path = require("path");
const root = path.join(__dirname, "../..");

const dotenv = require("dotenv");
dotenv.config({ path: `${root}/.env` });

/* c8 ignore next 6 */
if (process.env.NODE_ENV !== "test") {
  dotenv.config({
    path: `${root}/.env.${process.env.NODE_ENV}`,
    override: true,
  });
}

dotenv.config({
  path: `${root}/.env.${[process.env.NODE_ENV, "local"]
    .filter(Boolean)
    .join(".")}`,
  override: true,
});

const { knexSnakeCaseMappers } = require("objection");

const baseConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    charset: "utf8mb4",
  },
  pool: {
    min: Math.max(parseInt(process.env.DB_POOL_MIN || "1"), 1),
    max: Math.max(parseInt(process.env.DB_POOL_MAX || "1"), 1),
  },
  migrations: {
    tableName: "knex_migrations",
    directory: path.join(__dirname, "/migrations"),
    extension: "ts",
  },
  ...knexSnakeCaseMappers(),
};

const config = {
  development: baseConfig,
  test: {
    ...baseConfig,
    connection: {
      ...baseConfig.connection,
      multipleStatements: true,
    },
    pool: {
      ...baseConfig.pool,
      min: 1,
      max: 1,
    },
  },
};

export default config;
