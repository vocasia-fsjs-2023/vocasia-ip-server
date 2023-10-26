const express = require("express");
const postController = require("../controllers/post-controller");
const { authMiddleware, isOwned } = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/posts", postController.index);
router.get("/posts/:postId", postController.get);

router.post("/posts", authMiddleware, postController.create);
router.put("/posts/:postId", authMiddleware, isOwned, postController.update);
router.delete("/posts/:postId", authMiddleware, isOwned, postController.remove);

module.exports = router;
