const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const registerUser = async ({ name, email, password }) =>{
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        throw new Error('Este e-mail já esta em uso.');
    }

    const newUser = await User.create({ name, email, password });

    const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const { password: _, ...userWhithoutPassword } = newUser.toJSON();

    return { user: userWhithoutPassword, token };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('E-mail ou senha invalidos.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('E-mail ou senha invalidos.');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const { password: _, ...userWhithoutPassword } = user.toJSON();
    return { user: userWhithoutPassword, token };
}

module.exports = {
    registerUser,
    loginUser,
};