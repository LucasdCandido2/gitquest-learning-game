'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lessonsData = [
      {
        title: 'Introdução ao Git',
        slug: 'introducao-ao-git',
        content: 'Aprenda os conceitos básicos do Git e controle de versão.',
        order: 1,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Branches e Merges',
        slug: 'branches-e-merges',
        content: 'Entenda como trabalhar com branches e fazer merges.',
        order: 2,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Git Flow no Mercado',
        slug: 'git-flow-mercado',
        content: 'Aprenda as práticas de Git Flow utilizadas no mercado de trabalho.',
        order: 3,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('lessons', lessonsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};