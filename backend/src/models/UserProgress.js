const { Model, DataTypes } = require('sequelize');

class UserProgress extends Model {
    static associate(models) {
        UserProgress.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        UserProgress.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            as: 'lesson'
        });
    }
}

function initUserProgress(sequelize) {
    UserProgress.init(
        {
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
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 100,
                },
            },
            completedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'UserProgress',
            tableName: 'user_progress',
            timestamps: true,
        }
    );

    return UserProgress;
}

module.exports = initUserProgress;