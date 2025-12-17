const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email and password are required.' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format.' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long.' 
      });
    }

    const result = await authService.register(username, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message.includes('already exists') || error.message.includes('já existe')) {
      return res.status(409).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Error registering user.',
      details: error.message 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required.' 
      });
    }

    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message.includes('not found') || error.message.includes('Invalid')) {
      return res.status(401).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Error logging in.',
      details: error.message 
    });
  }
};