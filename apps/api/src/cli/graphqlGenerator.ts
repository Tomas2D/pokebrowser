import { makeSchema } from "@app/graphql/makeSchema";

console.info("Generating GraphQL schema and TypeScript types...");

makeSchema();

console.info("Done");
