# Elementary Software Solutions Test


## Clone repository

- To clone repository run `git clone https://github.com/Horrorspace/elementary-software-solutions-test`.

## Install dependencies

- Run `cd elementary-software-solutions-test` to go in app directory.
- Run `yarn install --frozen-lockfile` to install dependencies.

## Configuration

- Run `cp ./.example.env ./.env` to create configuration file, and then set up values of variables in this file.

### Environment variables description
- API_HOST: Host on which API should run (example - `0.0.0.0`);
- API_PORT: Port on which API should run (example - `3000`);
- APP_MODE: Mode of application (available values - `development`, `production`);
- DATABASE_URL: PostgreSQL connection string (example - `postgres://user:pass@localhost:5432/db`);
- RUB_API_URL: RUB API URL (example - `https://example.com`);
- THB_API_KEY: THB API key (example - `h0wwdcak3ie8q6mvwkh5apxgd9mrb`);
- THB_API_URL: THB API URL (example - `https://example.com`);

## Run in container

- Run `docker-compose up` to run app in container.

## Documentation

- If application runs with environment variable `APP_MODE` set in `development` value, API documentation must be available on `/doc` path. Open it in any browser to see API documentation.

## Setting up databases

- Run `yarn db:migrate` to set up indexes and tables in PostgreSQL.
- Run `yarn db:generate` to generate client code and types for PostgreSQL.

## Running locally in watch mode

- Run `yarn start:dev` and after that server will run on port and address which set in configuration file.

## Build the app

- Run `yarn build` and after that application will be built in dist directory.
