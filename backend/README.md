# AdonisJS + TypeScript

This project provides a minimal setup to get an AdonisJS 7 API working with TypeScript, Lucid (SQLite by default) and token-based auth.

To run it (Node.js 24 or later):

```bash
npm install
cp .env.example .env
node ace generate:key
node ace migration:run
npm run dev
```

The API responds on `http://localhost:3333`, and the routes live under `/api/v1` (`start/routes.ts`).

Currently, these official packages are installed and configured:

- [@adonisjs/lucid](https://lucid.adonisjs.com) is the ORM, using SQLite through `better-sqlite3`
- [@adonisjs/auth](https://docs.adonisjs.com/guides/authentication) provides the `api` access token guard and a session guard
- [@vinejs/vine](https://vinejs.dev) validates the input, through the validators in `app/validators`
- [@adonisjs/cors](https://docs.adonisjs.com/guides/security/cors), [@adonisjs/shield](https://docs.adonisjs.com/guides/security/securing-web-apps) and [@adonisjs/session](https://docs.adonisjs.com/guides/basics/session) cover CORS, web security and sessions
- [@tuyau/core](https://tuyau.julr.dev) generates the typed registry that is exposed as `backend/registry`
- [Japa](https://japa.dev) runs the tests with `npm test` (`tests/unit` and `tests/functional` suites)

## Bouncer

Bouncer is not installed in this project yet, so there are no policies or abilities. To add it, see [this documentation](https://docs.adonisjs.com/guides/authorization).

TODO: confirm whether Bouncer will be added to the starting project or in a later session.

## Expanding the database configuration

The default connection is SQLite (`tmp/db.sqlite3`). If you are developing a production application, we recommend switching to a server database by installing its client package (for example `npm install pg`) and uncommenting the matching connection in `config/database.ts`:

```ts
pg: {
  client: 'pg',
  connection: {
    host: env.get('DB_HOST'),
    port: env.get('DB_PORT'),
    user: env.get('DB_USER'),
    password: env.get('DB_PASSWORD'),
    database: env.get('DB_DATABASE'),
  },
  migrations: {
    naturalSort: true,
    paths: ['database/migrations'],
  },
  debug: app.inDev,
},
```

Add the new variables to `start/env.ts` and `.env.example` too. See the [Lucid documentation](https://lucid.adonisjs.com) for the full list of supported databases.
