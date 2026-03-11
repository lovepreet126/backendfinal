const express = require('express');
const morgan  = require('morgan');
const cors    = require('cors');
const path    = require('path');

const logger       = require('./middleware/logger');
const authCheck    = require('./middleware/authCheck');
const errorHandler = require('./middleware/errorHandler');
const gigRoutes    = require('./routes/gigRoutes');
const userRoutes   = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));   
app.use(cors());          

app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/gigs',  gigRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Campus GigBoard API is running 🚀' });
});

app.use((req, res, next) => {
  const err = new Error(`Route ${req.url} not found`);
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Static files served from /public`);
  console.log(`📦 Routes: /api/gigs | /api/users | /api/health\n`);
});
