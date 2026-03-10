const express = require('express');
const router  = express.Router();

const { getUsers, getUserById, getUserGigs } = require('../controllers/userController');

// ─── Router-Level Middleware ───────────────────────────────────────────────────
router.use((req, res, next) => {
  console.log(`[USER ROUTER] ${req.method} ${req.url}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
router.get('/',                  getUsers);     // GET /api/users
router.get('/:userId',           getUserById);  // GET /api/users/u1
router.get('/:userId/gigs',      getUserGigs);  // GET /api/users/u1/gigs

module.exports = router;
