// ─── Router-Level Middleware ───────────────────────────────────────────────────
// Used on specific routes that need protection
// Example: only logged-in users can POST or DELETE a gig

const authCheck = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    const err = new Error('Unauthorized - No token provided');
    err.status = 401;
    return next(err); // passes error to errorHandler
  }

  // For eval 1 we just check token exists (no JWT verification needed)
  if (token !== 'gigboard-token-123') {
    const err = new Error('Unauthorized - Invalid token');
    err.status = 401;
    return next(err);
  }

  next(); // token is valid, move to next
};

module.exports = authCheck;
