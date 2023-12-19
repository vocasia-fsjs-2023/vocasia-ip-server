const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login',authMiddleware, userController.login);

router.post('/register', userController.register);


module.exports = router;