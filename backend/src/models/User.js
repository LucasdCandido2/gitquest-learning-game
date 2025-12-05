// backend/src/models/User.js

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {
    // Método estático para associar modelos (será útil no futuro)
    static associate(models) {
      // Exemplo: User.hasMany(models.LessonProgress);
    }
  }

  User.init({
    // O ID será gerado automaticamente pelo Sequelize
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // O nome é obrigatório
      validate: {
        notEmpty: {
          msg: 'O nome não pode ser vazio.',
        },
        len: {
          args: [3, 100],
          msg: 'O nome deve ter entre 3 e 100 caracteres.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Este e-mail já está em uso.',
      },
      validate: {
        isEmail: {
          msg: 'Formato de e-mail inválido.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'A senha não pode ser vazia.',
        },
        len: {
          args: [6, 100],
          msg: 'A senha deve ter no mínimo 6 caracteres.',
        },
      },
    },
  }, {
    sequelize, // Passa a instância do Sequelize
    modelName: 'User',
    tableName: 'users', // Nome da tabela no banco de dados
    // Hooks: Funções que são executadas em determinados eventos do ciclo de vida do modelo
    hooks: {
      // Antes de criar um usuário, vamos hashear a senha
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  });

  return User;
};