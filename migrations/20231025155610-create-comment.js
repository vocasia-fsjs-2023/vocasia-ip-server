"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Comments", {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Posts",
                    key: "id",
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            content: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Comments");
    },
};
