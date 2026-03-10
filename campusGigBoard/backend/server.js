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

// ─── Built-in Middleware ───────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Third-party Middleware ────────────────────────────────────────────────────
app.use(morgan('dev'));   // logs every request in terminal
app.use(cors());          // allows cross-origin requests

// ─── Application-Level Custom Middleware (runs on every request) ───────────────
app.use(logger);

// ─── Static Files ─────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/gigs',  gigRoutes);
app.use('/api/users', userRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Campus GigBoard API is running 🚀' });
});

// ─── 404 Handler (unknown routes) ─────────────────────────────────────────────
app.use((req, res, next) => {
  const err = new Error(`Route ${req.url} not found`);
  err.status = 404;
  next(err);
});

// ─── Error Handler Middleware (must be last, needs 4 args) ────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Static files served from /public`);
  console.log(`📦 Routes: /api/gigs | /api/users | /api/health\n`);
});
