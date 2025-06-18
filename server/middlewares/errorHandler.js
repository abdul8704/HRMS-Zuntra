const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400:
            res.json({ 
                success: false, 
                data: {
                    title: "Validation Error",
                    message: err.message,
                    stackTrace:err.stack,
                },
            });
            break;
        case 404:
            res.json({
                success: false,
                data: {
                    title: "Not Found",
                    message: err.message,
                    stackTrace:err.stack,
                },
            });
            break;
        case 401:
            res.json({
                success: false,
                data: {
                    title: "Unauthorized",
                    message: err.message,
                    stackTrace:err.stack,
                },
            });
            break;
        case 403:
            res.json({
                success: false,
                data: {
                    title: "Forbidden",
                    message: err.message,
                    stackTrace:err.stack,
                },
            });
            break;
        case 500:
            res.json({
                success: false,
                data: {
                    title: "Internal Server Error",
                    message: err.message,
                    stackTrace:err.stack,
                },
            });
            break;
        default:
            console.log("No Error All good");
            break
    }
};
module.exports = errorHandler;