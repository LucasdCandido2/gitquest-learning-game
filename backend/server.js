const express = require('express');
const sequelize = require('./src/config/database');

const User = require('./src/models/User')(sequelize);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Backend is running!' });
});

const startServer = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('🗄️ Database synchronized successfully!');

        app.listen(PORT, () => {
            console.log(`🚀 Beckend server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to start the server:', error);
    }
};

startServer();