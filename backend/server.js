// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🔧 Iniciando servidor...');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('✅ Middlewares carregados');

// Database
let sequelize;
try {
  const models = require('./src/models');
  sequelize = models.sequelize;
  console.log('✅ Models carregados');
} catch (error) {
  console.error('❌ Erro ao carregar models:', error.message);
  process.exit(1);
}

// Routes
let authRoutes, lessonRoutes, progressRoutes;
try {
  authRoutes = require('./src/routes/auth');
  lessonRoutes = require('./src/routes/lessons');
  progressRoutes = require('./src/routes/progress');
  console.log('✅ Rotas carregadas');
} catch (error) {
  console.error('❌ Erro ao carregar rotas:', error.message);
  process.exit(1);
}

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'GitQuest API esta rodando!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);

app.use((req, res) => {
  return res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Start server
console.log('🔌 Tentando conectar ao banco de dados...');

sequelize.authenticate()
  .then(() => {
    console.log('🗄️ Conexão com o banco de dados estabelecida com sucesso.');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
      console.log(`🌐 Accessible from the network at http://0.0.0.0:${PORT}`);
      console.log(`📡 API endpoints:`);
      console.log(`   - POST http://localhost:${PORT}/api/auth/register`);
      console.log(`   - POST http://localhost:${PORT}/api/auth/login`);
      console.log(`   - GET  http://localhost:${PORT}/api/lessons`);
      console.log(`   - GET  http://localhost:${PORT}/api/progress/stats`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao conectar com o banco de dados:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
  });

module.exports = app;