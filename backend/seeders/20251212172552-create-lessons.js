// backend/seeders/20251212172552-create-lessons.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('lessons', [
      {
        title: 'Introdução ao Git',
        slug: 'introducao-ao-git',
        description: 'Aprenda os conceitos básicos de controle de versão com Git.',
        content: 'Conteúdo da lição de introdução ao Git...',
        difficulty: 'beginner',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Trabalhando com Branches',
        slug: 'trabalhando-com-branches',
        description: 'Entenda como criar, alternar e fazer merge de branches.',
        content: 'Conteúdo da lição sobre branches...',
        difficulty: 'intermediate',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Colaboração com Pull Requests',
        slug: 'colaboracao-com-pull-requests',
        description: 'Veja como colaborar usando pull requests em plataformas como GitHub.',
        content: 'Conteúdo da lição sobre pull requests...',
        difficulty: 'intermediate',
        createdAt: now,
        updatedAt: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};