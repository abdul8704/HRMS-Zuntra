const apiLogger = (req, res, next) => {
  const now = new Date();

  // console.log(`[${now.toISOString()}] ${req.method} ${req.originalUrl}`);

  // You could also save it in a database or a file if needed
  // e.g., fs.appendFile or a logging library like Winston

  next(); // proceed to the next middleware/route handler
};

module.exports = apiLogger;