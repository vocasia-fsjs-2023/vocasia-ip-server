"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });

            Post.hasMany(models.Comment, {
                foreignKey: "postId",
                as: "comments",
            });
        }
    }
    Post.init(
        {
            userId: DataTypes.UUID,
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            content: DataTypes.TEXT,
            published: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
