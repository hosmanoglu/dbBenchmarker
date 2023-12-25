# dbBenchmarker

## Project Description

dbBenchmarker is a tool designed for conducting performance tests on different databases. Currently, it supports PostgreSQL and SurrealDB.

## Requirements

The following software needs to be installed for the project to function properly:

- [Node.js](https://nodejs.org/) version 12 or higher
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for running Docker containers)

## Installation

1. Add a `.env` file to the project root and fill in the following variables:

```plaintext
POSTGRESQL_URL=postgres://postgres:postgres@localhost:5432/postgres
SURREALDB_URL=ws://127.0.0.1:8000
SURREALDB_USER=surrealdb
SURREALDB_PASS=surrealdb
SURREALDB_NAME_SPACE=test
SURREALDB_DATABASE=test
HOW_MANY_RECORD=10000
```

2. To start the databases using Docker, follow these steps in your terminal:

```plaintext
cd docker
docker-compose up
```


3. Install necessary dependencies by running the following command in your terminal:

```plaintext
npm install -g bun
bun install
```

4. Start the project by running the following command:
```plaintext
bun run start
```


## Usage

- To add a scenario, include a new scenario in the `scenario.js` file.
- To add a new database, extend the `DbBenchmarkBase` class and override all functions.

## Contribution

If you'd like to contribute, please ensure to explain your changes before submitting a pull request. We welcome anyone interested in contributing to the project's development process!

