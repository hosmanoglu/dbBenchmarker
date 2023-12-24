# dbBenchmarker

Benchmarker databases
right now only postgresql and surrealdb

example .env
POSTGRESQL_URL=postgres://postgres:postgres@localhost:5432/postgres
SURREALDB_URL=ws://127.0.0.1:8000
SURREALDB_USER=surrealdb
SURREALDB_PASS=surrealdb
SURREALDB_NAME_SPACE=test
SURREALDB_DATABASE=test
HOW_MANY_RECORD=10000

for running
-- bun run start
