const { ResponseError } = require("../error/response-error");
const { Comment, Post, User } = require("../models");
const { createCommentValidation, getCommentValidation, updateCommentValidation } = require("../validation/comment-validation");
const { getPostValidation } = require("../validation/post-validation");
const { validate } = require("../validation/validation");

const index = async (postId) => {
    postId = validate(getPostValidation, postId);
    const post = await Post.findByPk(postId, {
        where: {
            deletedAt: null,
        },
    });
    if (!post) {
        throw new ResponseError(404, "Post not found");
    }

    return Comment.findAll({
        where: {
            postId: postId,
            deletedAt: null,
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["name", "username"],
            }
        ]
    });
}

const create = async (request) => {
    const commentRequest = validate(createCommentValidation, request);
    const post = await Post.findOne({
        where: {
            id: commentRequest.postId,
            deletedAt: null,
        },
    });

    if (!post) {
        throw new ResponseError(404, "Post not found");
    }

    return Comment.create({
        userId: commentRequest.userId,
        postId: commentRequest.postId,
        content: commentRequest.content,
    });
};

const update = async (user, postId, request) => {
    const commentRequest = validate(updateCommentValidation, request);
    const comment = await Comment.findByPk(commentRequest.id, {
        where: {
            deletedAt: null,
        },
    });

    const post = await Post.findByPk(postId, {
        where: {
            deletedAt: null,
        },
    });

    if (!comment) {
        throw new ResponseError(404, "Comment not found");
    } else if (!post) {
        throw new ResponseError(404, "Post not found");
    } else if (comment.userId != user.id) {
        throw new ResponseError(403, "Forbidden");
    } else {
        comment.content = commentRequest.content;
        return comment.save();
    }
}

const remove = async (user, postId, commentId) => {
    commentId = validate(getCommentValidation, commentId);
    const comment = await Comment.findByPk(commentId, {
        where: {
            deletedAt: null,
        },
    });
    const post = await Post.findByPk(postId, {
        where: {
            deletedAt: null,
        },
    });

    if (!comment) {
        throw new ResponseError(404, "Comment not found");
    } else if (!post) {
        throw new ResponseError(404, "Post not found");
    } else if (comment.userId != user.id) {
        throw new ResponseError(403, "Forbidden");
    } else {
        return comment.update({
            deletedAt: new Date(),
        });
    }
}

module.exports = commentService = { create, update, remove, index };
