const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class UserProgress extends Model {
        static associate(models) {
            UserProgress.belongsTo(models.User, { foreignKey: 'userId' });
            UserProgress.belongsTo(models.Lesson, { foreignKey: 'lessonId' });
        }
    }

    UserProgress.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'lessons',
                key: 'id',
            },
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        completedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'UserProgress',
        tableName: 'user_progresses',
        timestamps: true,
    });

    return UserProgress;
};