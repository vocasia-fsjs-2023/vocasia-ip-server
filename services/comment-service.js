const { ResponseError } = require("../error/response-error");
const { Comment, Post } = require("../models");
const { createCommentValidation, getCommentValidation, updateCommentValidation } = require("../validation/comment-validation");
const { validate } = require("../validation/validation");

const create = async (request) => {
    const commentRequest = validate(createCommentValidation, request);
    const post = await Post.findOne({
        where: {
            id: commentRequest.postId,
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
    const comment = await Comment.findByPk(commentRequest.id);
    const post = await Post.findByPk(postId);

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
    const comment = await Comment.findByPk(commentId);
    const post = await Post.findByPk(postId);

    if (!comment) {
        throw new ResponseError(404, "Comment not found");
    } else if (!post) {
        throw new ResponseError(404, "Post not found");
    } else if (comment.userId != user.id) {
        throw new ResponseError(403, "Forbidden");
    } else {
        return comment.destroy();
    }
}

module.exports = commentService = { create, update, remove };
