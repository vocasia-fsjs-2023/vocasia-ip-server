const commentService = require("../services/comment-service");

const index = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const comments = await commentService.index(postId);
        res.status(200).json({
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const postId = req.params.postId;
        const request = req.body;
        request.userId = user.id;
        request.postId = postId;

        const result = await commentService.create(request);
        res.status(201).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const request = req.body;
        request.id = commentId;

        const result = await commentService.update(user, postId, request);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        await commentService.remove(user, postId, commentId);
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = commentController = { create, update, remove, index };
