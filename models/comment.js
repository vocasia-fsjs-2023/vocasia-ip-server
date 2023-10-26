"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });

            Comment.belongsTo(models.Post, {
                foreignKey: "postId",
                as: "post",
            });
        }
    }
    Comment.init(
        {
            postId: DataTypes.UUID,
            userId: DataTypes.UUID,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Comment",
        }
    );
    return Comment;
};
