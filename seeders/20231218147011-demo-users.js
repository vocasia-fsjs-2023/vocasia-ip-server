'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: await bcrypt.hash('user123', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: await bcrypt.hash('user456', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
