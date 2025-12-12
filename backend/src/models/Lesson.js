const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Lesson extends Model {
        static associate(models) {
            Lesson.hasMany(models.UserProgress, { foreignKey: 'lessonId' });
        }
    }

    Lesson.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'Lesson',
        tableName: 'lessons',
    });

    return Lesson;
}