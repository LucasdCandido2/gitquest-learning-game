const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Backend ir running!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});