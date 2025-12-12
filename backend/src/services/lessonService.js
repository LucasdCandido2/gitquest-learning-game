const { Lesson } = require('../models');

const findAllPublished = async () => {
    return await Lesson.findAll({
        where: { isPublished: true },
        order: [['order', 'ASC']],
    });
};

module.exports = {
    findAllPublished,
};