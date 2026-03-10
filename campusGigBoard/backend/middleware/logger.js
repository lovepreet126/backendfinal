// ─── Application-Level Middleware ─────────────────────────────────────────────
// Runs on EVERY request before it reaches any route
// This is a custom logger we wrote (different from morgan which is third-party)

const logger = (req, res, next) => {
  const time   = new Date().toISOString();
  const method = req.method;
  const url    = req.url;

  console.log(`[LOGGER] ${time} | ${method} ${url}`);

  next(); // MUST call next() to pass request to the next middleware/route
};

module.exports = logger;
