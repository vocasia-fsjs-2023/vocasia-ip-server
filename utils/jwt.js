const jwt = require("jsonwebtoken");
const { ResponseError } = require("../error/response-error");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
