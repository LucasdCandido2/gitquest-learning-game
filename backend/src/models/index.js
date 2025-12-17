const { sequelize, Sequelize } = require('../config/database');

const initUser = require('./User');
const initLesson = require('./Lesson');
const initUserProgress = require('./UserProgress');

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = initUser(sequelize);
db.Lesson = initLesson(sequelize);
db.UserProgress = initUserProgress(sequelize);

Object.values(db)
  .filter((model) => model && typeof model.associate === 'function')
  .forEach((model) => {
    model.associate(db);
  });

module.exports = db;