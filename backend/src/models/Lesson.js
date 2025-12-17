const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Lesson extends Model {
    static associate(models) {
      Lesson.hasMany(models.UserProgress, {
        foreignKey: 'lessonId',
        as: 'progress'
      });
    }
  }

  Lesson.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Lesson',
    tableName: 'lessons',
    timestamps: true
  });

  return Lesson;
};