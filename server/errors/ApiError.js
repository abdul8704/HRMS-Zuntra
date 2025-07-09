class ApiError extends Error {
    constructor(statusCode, message, details = null) {
        super(message);
        this.statusCode = statusCode;
        if (details) this.details = details;
        console.log("Api Error", message, statusCode, details);
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;