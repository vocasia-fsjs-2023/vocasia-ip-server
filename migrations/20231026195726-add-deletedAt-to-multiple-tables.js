'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Posts', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Comments', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'deletedAt');
    await queryInterface.removeColumn('Posts', 'deletedAt');
    await queryInterface.removeColumn('Comments', 'deletedAt');
  }
};
