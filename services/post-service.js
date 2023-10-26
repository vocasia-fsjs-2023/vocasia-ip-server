const { ResponseError } = require("../error/response-error");
const { Post, Comment, User } = require("../models");
const {
    createPostValidation,
    getPostValidation,
    updatePostValidation,
} = require("../validation/post-validation");
const { validate } = require("../validation/validation");

const index = () => {
    return Post.findAll({
        where: {
            published: true,
        },
        attributes: {
            exclude: ["userId"],
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["name", "username", "email"],
            },
        ],
    });
};

const create = (user, request) => {
    const post = validate(createPostValidation, request);
    post.userId = user.id;
    post.slug = post.title.toLowerCase().split(" ").join("-");

    return Post.create(post);
};

const get = (postId) => {
    postId = validate(getPostValidation, postId);
    return Post.findOne({
        where: {
            id: postId,
        },
        attributes: ["id", "title", "content", "slug", "createdAt"],
        include: [
            {
                model: User,
                as: "user",
                attributes: ["name", "username", "email"],
            },
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "content", "createdAt"],
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["name", "username"],
                    },
                ],
            },
        ],
    });
};

const update = async (request) => {
    const postRequest = validate(updatePostValidation, request);
    const post = await Post.findByPk(postRequest.id);

    if (!post) {
        throw new ResponseError(404, "Post not found");
    }

    post.title = postRequest.title || post.title;
    post.content = postRequest.content || post.content;
    post.slug =
        postRequest.title.toLowerCase().split(" ").join("-") ||
        post.title.toLowerCase().split(" ").join("-");
    post.published = postRequest.published;

    return post.save();
};

const remove = (postId) => {
    postId = validate(getPostValidation, postId);
    return Post.destroy({
        where: {
            id: postId,
        },
    });
};

module.exports = postService = { index, create, get, update, remove };
