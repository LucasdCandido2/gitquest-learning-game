// backend/src/config/database.js

const { Sequelize } = require('sequelize');

// O caminho para o arquivo do banco de dados está no nosso .env
const dbPath = process.env.DB_PATH || './database.sqlite';

// Criamos a instância do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false, // Desativa os logs SQL no console para ficar mais limpo
});

module.exports = sequelize;