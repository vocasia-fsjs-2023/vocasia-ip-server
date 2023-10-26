const jwt = require("jsonwebtoken");
const { User, Post } = require("../models");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401)
            .json({
                errors: {
                    message: "Unauthorized",
                }
            })
            .end();
    } else {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401)
                    .json({
                        errors: {
                            message: "Unauthorized",
                        }
                    })
                    .end();
            } else {
                const user = await User.findByPk(decoded.id);
                if (!user) {
                    res.status(401)
                        .json({
                            errors: {
                                message: "Unauthorized",
                            }
                        })
                        .end();
                } else {
                    req.user = user;
                    next();
                }
            }
        });
    }
};

const ownerPost = async (req, res, next) => {
    const user = req.user;
    const postId = req.params.postId;

    const post = await Post.findByPk(postId);

    if (post.userId !== user.id) {
        return res
            .status(403)
            .json({
                errors: {
                    message: "Forbidden",
                },
            })
            .end();
    } else {
        next();
    }
};

module.exports = { authMiddleware, ownerPost };
