const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

exports.register = async (username, email, password) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      throw new Error('Username already taken.');
    }

    // Hash password with bcryptjs (10 rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Password being hashed:', password);
    console.log('Hashed password:', hashedPassword);

    // Create user
    const user = await User.create({
      username,
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
      message: 'User registered successfully.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found.');
    }

    console.log('Login attempt for:', email);
    console.log('Password provided:', password);
    console.log('Stored hash:', user.password);

    // Verify password with bcryptjs
    const isValidPassword = await bcrypt.compare(password, user.password);

    console.log('Password valid?', isValidPassword);

    if (!isValidPassword) {
      throw new Error('Invalid password.');
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};