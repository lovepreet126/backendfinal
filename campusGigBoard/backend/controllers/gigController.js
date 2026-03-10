const fs   = require('fs');   // built-in file system module
const path = require('path');

// Helper: read gigs from JSON file using fs module
const readGigs = () => {
  const filePath = path.join(__dirname, '../data/gigs.json');
  const data     = fs.readFileSync(filePath, 'utf-8'); // fs module usage
  return JSON.parse(data);
};

// Helper: write updated gigs back to JSON file
const writeGigs = (gigs) => {
  const filePath = path.join(__dirname, '../data/gigs.json');
  fs.writeFileSync(filePath, JSON.stringify(gigs, null, 2));
};

// ─── GET /api/gigs ─────────────────────────────────────────────────────────────
// Get all gigs (optional filter by category using query param)
const getGigs = (req, res, next) => {
  try {
    let gigs = readGigs();

    // Route query: /api/gigs?category=coding
    const { category, status } = req.query;
    if (category) gigs = gigs.filter(g => g.category === category);
    if (status)   gigs = gigs.filter(g => g.status   === status);

    res.status(200).json({ success: true, count: gigs.length, gigs });
  } catch (err) {
    next(err); // passes to errorHandler middleware
  }
};

// ─── GET /api/gigs/:id ─────────────────────────────────────────────────────────
// Get a single gig by ID — shows route parameters
const getGigById = (req, res, next) => {
  try {
    const gigs = readGigs();
    const gig  = gigs.find(g => g.id === parseInt(req.params.id));

    if (!gig) {
      const err = new Error('Gig not found');
      err.status = 404;
      throw err; // goes to catch → next(err) → errorHandler
    }

    res.status(200).json({ success: true, gig });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/gigs/category/:type ─────────────────────────────────────────────
// Get gigs by category — shows route paths
const getGigsByCategory = (req, res, next) => {
  try {
    const gigs     = readGigs();
    const filtered = gigs.filter(g => g.category === req.params.type);

    res.status(200).json({ success: true, count: filtered.length, gigs: filtered });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/gigs ────────────────────────────────────────────────────────────
// Create a new gig — protected route (needs authCheck middleware)
const createGig = (req, res, next) => {
  try {
    const { title, description, category, budget, postedBy } = req.body;

    // Validate required fields
    if (!title || !category || !budget) {
      const err = new Error('Title, category and budget are required');
      err.status = 400;
      throw err;
    }

    const gigs  = readGigs();
    const newId = gigs.length > 0 ? gigs[gigs.length - 1].id + 1 : 1;

    const newGig = {
      id: newId,
      title,
      description: description || '',
      category,
      budget: parseInt(budget),
      postedBy: postedBy || 'unknown',
      status: 'open'
    };

    gigs.push(newGig);
    writeGigs(gigs);

    res.status(201).json({ success: true, message: 'Gig created successfully!', gig: newGig });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/gigs/:id ─────────────────────────────────────────────────────────
// Update a gig — protected route
const updateGig = (req, res, next) => {
  try {
    const gigs  = readGigs();
    const index = gigs.findIndex(g => g.id === parseInt(req.params.id));

    if (index === -1) {
      const err = new Error('Gig not found');
      err.status = 404;
      throw err;
    }

    gigs[index] = { ...gigs[index], ...req.body, id: gigs[index].id };
    writeGigs(gigs);

    res.status(200).json({ success: true, message: 'Gig updated!', gig: gigs[index] });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/gigs/:id ──────────────────────────────────────────────────────
// Delete a gig — protected route
const deleteGig = (req, res, next) => {
  try {
    let gigs  = readGigs();
    const gig = gigs.find(g => g.id === parseInt(req.params.id));

    if (!gig) {
      const err = new Error('Gig not found');
      err.status = 404;
      throw err;
    }

    gigs = gigs.filter(g => g.id !== parseInt(req.params.id));
    writeGigs(gigs);

    res.status(200).json({ success: true, message: 'Gig deleted successfully!' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getGigs, getGigById, getGigsByCategory, createGig, updateGig, deleteGig };
