const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        error: 'Nome, e-mail e senha são obrigatórios.' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Formato de e-mail inválido.' 
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({ 
        error: 'A senha deve ter pelo menos 6 caracteres.' 
      });
    }

    const result = await authService.register(nome, email, senha);
    res.status(201).json(result);
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message.includes('already exists') || error.message.includes('já existe')) {
      return res.status(409).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Erro ao registrar usuário.',
      details: error.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ 
        error: 'E-mail e senha são obrigatórios.' 
      });
    }

    const result = await authService.login(email, senha);
    res.status(200).json(result);
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message.includes('not found') || error.message.includes('Invalid') || error.message.includes('não encontrado') || error.message.includes('inválida')) {
      return res.status(401).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Erro ao fazer login.',
      details: error.message 
    });
  }
};