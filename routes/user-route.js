const express = require("express");
const userController = require("../controllers/user-controller");
const { authMiddleware } = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", authMiddleware, userController.get);

module.exports = router;
