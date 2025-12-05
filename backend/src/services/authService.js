const jwt = require('jsonwebtoken');
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

module.exports = {
    registerUser,
};