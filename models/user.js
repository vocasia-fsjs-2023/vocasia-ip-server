"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Post, {
                foreignKey: "userId",
                as: "posts",
            });

            User.hasMany(models.Comment, {
                foreignKey: "userId",
                as: "comments",
            });
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    User.beforeCreate(async (user, options) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    });

    return User;
};
