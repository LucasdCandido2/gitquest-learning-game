const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const { sequelize } = require('./src/models');

// Routes
const authRoutes = require('./src/routes/auth');
const lessonRoutes = require('./src/routes/lessons');
const progressRoutes = require('./src/routes/progress');

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'GitQuest API esta rodando!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/auth', authRoutes);
app.use('/lessons', lessonRoutes);
app.use('/progress', progressRoutes);

// Start server
sequelize.authenticate()
  .then(() => {
    console.log('🗄️ Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Beckend server is running on http://localhost:${PORT}`);
      console.log(`🌐 Accessible from the network at http://0.0.0.0:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao conectar com o banco de dados:', err);
  });

module.exports = app;