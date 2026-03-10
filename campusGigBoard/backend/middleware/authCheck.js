

const authCheck = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    const err = new Error('Unauthorized - No token provided');
    err.status = 401;
    return next(err); 
  }

  
  if (token !== 'gigboard-token-123') {
    const err = new Error('Unauthorized - Invalid token');
    err.status = 401;
    return next(err);
  }

  next(); 
};

module.exports = authCheck;
