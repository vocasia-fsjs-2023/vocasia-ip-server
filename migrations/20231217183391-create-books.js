'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title cannot be empty',
          },
        },
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Author cannot be empty',
          },
        },
      },
      description: {
        type: Sequelize.TEXT,
      },
      genre: {
        type: Sequelize.STRING,
      },
      publicationYear: {
        type: Sequelize.INTEGER,
      },
      availableCopies: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: {
            args: 0,
            msg: 'Available copies cannot be negative',
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  },
};