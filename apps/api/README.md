# @pokemons/api

## Preparation

- Ensure you have MySQL 5+ server.
- Create and fill `apps/api/.env.local` and `apps/api/.env.test` (ensure that specified databases exist!)
 
Run following commands:

```bash
$ cd apps/api

$ npm run database:migrate
$ npm run database:import
```

## Notes

The API provides two entry points, one for execution (`./dist/index.js`) and one for generated GraphQL types (`./dist/graphql.js`); 
second export is used in the `web` application, which does not need to do any extra work. 

## Commands

### Develop

```bash
$ npm run dev
```

### Build

```bash
$ npm run build
```

### Test

To run unit and integration tests, simply run:

```bash
$ npm run test
$ npm run test:coverage
```
