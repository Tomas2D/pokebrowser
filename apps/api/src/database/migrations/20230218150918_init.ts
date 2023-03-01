import type { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("pokemon_classification", function (table) {
    table.increments("id").primary();
    table.string("name", 255).notNullable().unique();
  });

  await knex.schema.createTable("user", function (table) {
    table.uuid("id").primary();
    table.timestamp("created_at").defaultTo(knex.raw("now()")).notNullable();
  });

  await knex.schema.createTable("pokemon", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("slug").notNullable();
    table
      .integer("classification_id")
      .unsigned()
      .references("id")
      .inTable("pokemon_classification")
      .onDelete("CASCADE");
    table.integer("evolution_requirement_amount").nullable();
    table.string("evolution_requirement_name").nullable();
    table.float("weight_minimum").comment("kg");
    table.float("weight_maximum").comment("kg");
    table.integer("height_minimum").comment("cm");
    table.integer("height_maximum").comment("cm");
    table.string("commonCaptureArea").nullable();
    table.float("flee_rate");
    table.integer("max_cp");
    table.integer("max_hp");
    table
      .integer("next_evolution_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("pokemon")
      .onDelete("SET NULL")
      .unique();
  });

  await knex.schema.createTable("pokemon_vote", function (table) {
    table
      .integer("pokemon_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon")
      .onDelete("CASCADE");
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.primary(["pokemon_id", "user_id"]);
  });

  await knex.schema.createTable("pokemon_type", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
  });

  await knex.schema.createTable("pokemon_type_pokemon", (table) => {
    table
      .integer("pokemon_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon")
      .onDelete("CASCADE");
    table
      .integer("type_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon_type")
      .onDelete("CASCADE");
    table.primary(["pokemon_id", "type_id"]);
  });

  await knex.schema.createTable("pokemon_resistant_pokemon", (table) => {
    table
      .integer("pokemon_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon")
      .onDelete("CASCADE");
    table
      .integer("type_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon_type")
      .onDelete("CASCADE");
    table.primary(["pokemon_id", "type_id"]);
  });

  await knex.schema.createTable("pokemon_weakness_pokemon", (table) => {
    table
      .integer("pokemon_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon")
      .onDelete("CASCADE");
    table
      .integer("type_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon_type")
      .onDelete("CASCADE");
    table.primary(["pokemon_id", "type_id"]);
  });

  await knex.schema.createTable("pokemon_attack", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique();
    table
      .integer("type_id")
      .unsigned()
      .references("id")
      .inTable("pokemon_type")
      .onDelete("CASCADE");
    table.enum("category", ["fast", "special"]).notNullable();
    table.integer("damage");
  });

  await knex.schema.createTable("pokemon_attack_pokemon", (table) => {
    table
      .integer("pokemon_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon")
      .onDelete("CASCADE");
    table
      .integer("attack_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("pokemon_attack")
      .onDelete("CASCADE");
    table.primary(["pokemon_id", "attack_id"]);
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists("pokemon_attack_pokemon");
  await knex.schema.dropTableIfExists("pokemon_weakness_pokemon");
  await knex.schema.dropTableIfExists("pokemon_resistant_pokemon");
  await knex.schema.dropTableIfExists("pokemon_type_pokemon");
  await knex.schema.dropTableIfExists("pokemon_vote");
  await knex.schema.dropTableIfExists("pokemon");
  await knex.schema.dropTableIfExists("pokemon_attack");
  await knex.schema.dropTableIfExists("pokemon_type");
  await knex.schema.dropTableIfExists("pokemon_classification");
  await knex.schema.dropTableIfExists("user");
}
