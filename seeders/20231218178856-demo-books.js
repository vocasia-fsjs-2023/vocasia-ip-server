'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        genre: 'Genre 1',
        publicationYear: 2020,
        availableCopies: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Book 2',
        author: 'Author 2',
        description: 'Description 2',
        genre: 'Genre 2',
        publicationYear: 2021,
        availableCopies: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
