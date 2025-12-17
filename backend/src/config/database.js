const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const storagePath = path.join(__dirname, '..', '..', 'database.sqlite');

const config = {
  development: {
    dialect: 'sqlite',
    storage: storagePath,
    logging: false,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: storagePath,
    logging: false,
  },
};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
});

module.exports = {
  ...config,
  sequelize,
  Sequelize,
};