const { Lesson } = require('../models');

const findAllPublished = async () => {
    return await Lesson.findAll({
        where: { isPublished: true },
        order: [['order', 'ASC']],
        attributes: { exclude: ['updatedAt'] },
    });
};

module.exports = {
    findAllPublished,
};