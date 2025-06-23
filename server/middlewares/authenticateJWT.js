const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ApiError = require('../errors/ApiError')

const authenticateToken = asyncHandler((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) 
        throw new ApiError(401, "Authorization header missing");

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") 
        throw new ApiError(400, "Invalid token format. Expected 'Bearer <token>'");

    const token = parts[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        throw new ApiError( 403,
            err.name === "TokenExpiredError"
                ? "Token has expired"
                : "Invalid or malformed JWT",
            err.message 
        );
    }
});

module.exports = authenticateToken;
