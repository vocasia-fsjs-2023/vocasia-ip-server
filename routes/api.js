const express = require("express");
const userController = require("../controllers/user-controller");
const postController = require("../controllers/post-controller");
const commentController = require("../controllers/comment-controller");
const { authMiddleware, ownerPost } = require("../middleware/auth-middleware");

const router = express.Router();

// user routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", authMiddleware, userController.get);

// post routes
router.get("/posts", postController.index);
router.get("/posts/:postId", postController.get);
router.post("/posts", authMiddleware, postController.create);
router.put("/posts/:postId", authMiddleware, ownerPost, postController.update);
router.delete("/posts/:postId", authMiddleware, ownerPost, postController.remove);

// comment routes
router.get("/posts/:postId/comments", commentController.index);
router.post("/posts/:postId/comments", authMiddleware, commentController.create);
router.put("/posts/:postId/comments/:commentId", authMiddleware, commentController.update);
router.delete("/posts/:postId/comments/:commentId", authMiddleware, commentController.remove);

module.exports = router;
