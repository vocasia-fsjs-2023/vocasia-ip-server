"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(200),
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
        await queryInterface.dropTable("Users");
    },
};
