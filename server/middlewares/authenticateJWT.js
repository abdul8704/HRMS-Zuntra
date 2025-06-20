const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err)
            return res
                .status(403)
                .json({
                    success: false,
                    x: "Unauthorized Access!!",
                    message: err.message,
                });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
