const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const { validate } = require("../validation/validation");
const { User } = require("../models");
const { ResponseError } = require("../error/response-error");
const { generateToken } = require("../utils/jwt");
const {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
} = require("../validation/user-validation");

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const emailExist = await User.count({ where: { email: user.email } });
    const usernameExist = await User.count({ where: { username: user.username } });
    
    if (emailExist === 1) {
        throw new ResponseError(400, "Email already exists");
    } else if (usernameExist === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    return User.create(user);
};

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await User.findOne({
        where: {
            username: loginRequest.username,
        },
    });

    if (!user) {
        throw new ResponseError(401, "Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(
        loginRequest.password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ResponseError(401, "Invalid username or password");
    }

    const payload = { id: user.id };
    const token = generateToken(payload);

    return { token };
};

const get = (username) => {
    username = validate(getUserValidation, username);
    const user = User.findOne({
        where: {
            username,
        },
        attributes: {
            exclude: ["password"],
        },
    });

    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    return user;
};

module.exports = userService = { register, login, get };
