const postService = require("../services/post-service");

const index = async (req, res, next) => {
    try {
        const result = await postService.index();
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await postService.create(user, request);

        res.status(201).json({
            data: {
                id: result.id,
                title: result.title,
                content: result.content,
                slug: result.slug,
            },
        });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const result = await postService.get(postId);
        return res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const request = req.body;
        request.id = postId;

        const result = await postService.update(request);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        await postService.remove(postId);
        res.status(200).json({
            data: "OK",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = postController = { index, create, get, update, remove };
