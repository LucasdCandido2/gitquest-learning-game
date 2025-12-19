const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

exports.register = async (nome, email, senha) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Já existe um usuário com este e-mail.');
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ where: { username: nome } });
    if (existingUsername) {
      throw new Error('Nome de usuário já está em uso.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Create user
    const user = await User.create({
      username: nome,
      email,
      password: hashedPassword
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      message: 'Usuário registrado com sucesso.',
      token,
      user: {
        id: user.id,
        nome: user.username,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

exports.login = async (email, senha) => {
  try {
    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    console.log('🔍 Usuário encontrado:', user.email);
    console.log('🔑 Senha fornecida:', senha);
    console.log('🔒 Hash no banco:', user.password);

    // Verify password
    const isValidPassword = await bcrypt.compare(senha, user.password);

    console.log('✅ Senha válida?', isValidPassword);

    if (!isValidPassword) {
      throw new Error('Senha inválida.');
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user.id,
        nome: user.username,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};