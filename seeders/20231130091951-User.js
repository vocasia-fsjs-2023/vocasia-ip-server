'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@email.com',
        password: 'admin',
        role: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user',
        email: 'user@email.com',
        password: 'user',
        role: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
