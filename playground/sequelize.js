const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI

const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5432/postgres') // Example for postgres

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}