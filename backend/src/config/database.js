// backend/src/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbPath = process.env.DB_PATH || './database.sqlite';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

module.exports = {
  sequelize,
  development: {
    dialect: 'sqlite',
    storage: dbPath,
    logging: false,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: dbPath,
    logging: false,
  },
};