'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const lessonsData = [
      {
        title: 'Introdução ao Git e GitHub',
        slug: 'introducao-git-github',
        description: 'Aprenda o que é Git, o que é GitHub e por que eles são importantes para o desenvolvimento de software.',
        content: 'Conteúdo da lição de introdução ao Git e GitHub...',
        order: 1,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Configurando seu ambiente Git',
        slug: 'configurando-ambiente-git',
        description: 'Instale o Git, configure seu usuário e prepare o ambiente para versionar seus projetos.',
        content: 'Conteúdo da lição de configuração do ambiente Git...',
        order: 2,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Primeiros comandos Git',
        slug: 'primeiros-comandos-git',
        description: 'Entenda na prática como criar repositórios, adicionar arquivos e fazer commits.',
        content: 'Conteúdo da lição de primeiros comandos Git...',
        order: 3,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      },
    ];

    await queryInterface.bulkInsert('lessons', lessonsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lessons', null, {});
  },
};