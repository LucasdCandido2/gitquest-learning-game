const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Lesson extends Model {
    static associate(models) {
      if (models.UserProgress) {
        Lesson.hasMany(models.UserProgress, {
          foreignKey: "lessonId",
          as: "progresses",
        });
      }
    }
  }

  Lesson.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O titulo é obrigatorio",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Lesson",
      tableName: "lessons",
      timestamps: true,
    }
  );

  return Lesson;
};
