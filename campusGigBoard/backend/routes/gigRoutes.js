const express   = require('express');
const router    = express.Router();
const authCheck = require('../middleware/authCheck');

const {
  getGigs,
  getGigById,
  getGigsByCategory,
  createGig,
  updateGig,
  deleteGig
} = require('../controllers/gigController');

// ─── Router-Level Middleware ───────────────────────────────────────────────────
// This runs on every request that hits /api/gigs
router.use((req, res, next) => {
  console.log(`[GIG ROUTER] ${req.method} ${req.url}`);
  next();
});

// ─── Public Routes (no auth needed) ───────────────────────────────────────────
router.get('/',                    getGigs);           // GET /api/gigs
router.get('/category/:type',      getGigsByCategory); // GET /api/gigs/category/coding
router.get('/:id',                 getGigById);        // GET /api/gigs/1

// ─── Protected Routes (authCheck middleware applied) ──────────────────────────
router.post('/',     authCheck, createGig);  // POST   /api/gigs
router.put('/:id',   authCheck, updateGig);  // PUT    /api/gigs/1
router.delete('/:id',authCheck, deleteGig);  // DELETE /api/gigs/1

module.exports = router;
