

const logger = (req, res, next) => {
  const time   = new Date().toISOString();
  const method = req.method;
  const url    = req.url;

  console.log(`[LOGGER] ${time} | ${method} ${url}`);

  next(); 
};

module.exports = logger;
