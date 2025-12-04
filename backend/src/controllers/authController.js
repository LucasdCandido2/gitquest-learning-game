const authService = require('../services/authService');

const register = async (req, res) => {
    const { name, email, password } = req.body;
     if (!name || !email || !password) {
        return res.status(400).json({ error: "Nome, e-mail e senha são obrigatorios." });
     }

     try {
        const newUser = await authService.registerUser({ name, email, password });
        res.status(201).json(newUser);
     } catch (error) {
        res.status(400).json({ error: error.message });
     }
};

module.exports = {
    register,
};