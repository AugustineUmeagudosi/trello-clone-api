const postgres = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,
    multipleStatements: true,
    dialect: "postgres"
});

module.exports = async function dbConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connected to Postgres.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
};