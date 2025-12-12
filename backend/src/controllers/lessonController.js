const lessonService = require('../services/lessonService');

const getAllLessons = async (req, res) => {
    try {
        const lessons = await lessonService.findAll({
            order: [['order', 'ASC']],
            attributes: { exclude: ['content'] },
        });
        res.status(200).json(lessons);
    } catch ( error ) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch lessons.' });
    }
};

module.exports = {
    getAllLessons,
};