const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing",
        });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({
            success: false,
            message: "Invalid token format. Expected 'Bearer <token>'",
        });
    }

    const token = parts[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        err.status = 403;
        throw err;
    }
};

module.exports = authenticateToken;
