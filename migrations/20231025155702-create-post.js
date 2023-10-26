"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Posts", {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                }
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
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
        await queryInterface.dropTable("Posts");
    },
};
