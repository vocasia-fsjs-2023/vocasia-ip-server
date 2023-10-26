"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("KanbanNotes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      kanbanId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Kanbans",
          },
          key: "id",
        },
        allowNull: false,
      },
      columnId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "KanbanColumns",
          },
          key: "id",
        },
        allowNull: false,
      },

      creatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      },
      colorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Colors",
          },
          key: "id",
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("KanbanNotes");
  },
};
