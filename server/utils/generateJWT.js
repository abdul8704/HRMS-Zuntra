const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET);
}

module.exports = {
    generateToken,
    generateRefreshToken
};