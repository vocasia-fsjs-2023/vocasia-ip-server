"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Comments", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            postId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Posts",
                    key: "id",
                },
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            content: {
                type: DataTypes.TEXT,
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
