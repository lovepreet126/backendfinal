// ─── Error-Handling Middleware ─────────────────────────────────────────────────
// IMPORTANT: Must have exactly 4 arguments (err, req, res, next)
// Express identifies it as error middleware ONLY because of the 4th arg
// Must be registered LAST in server.js after all routes

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    error:   err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
