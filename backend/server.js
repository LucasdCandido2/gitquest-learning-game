require('dotenv').config();

const express = require('express');
const db = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const authRoutes = require('./src/routes/auth');
const lessonsRoutes = require('./src/routes/lessons');
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend is running!' });
});
app.use('/auth', authRoutes);
app.use('/lessons', lessonsRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Backend is running!' });
});

const startServer = async () => {
    try {
        await db.sequelize.sync({ force: false });
        console.log('🗄️ Database synchronized successfully!');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Beckend server is running on http://localhost:${PORT}`);
            console.log(`🌐 Accessible from the network at http://0.0.0.0:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to start the server:', error);
    }
};

startServer();