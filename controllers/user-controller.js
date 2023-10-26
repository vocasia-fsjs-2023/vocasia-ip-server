const userService = require("../services/user-service");

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json({
            data: {
                id: result.id,
                name: result.name,
                username: result.username,
                email: result.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const username = req.user.username;
        const result = await userService.get(username);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = userController = { register, login, get };
