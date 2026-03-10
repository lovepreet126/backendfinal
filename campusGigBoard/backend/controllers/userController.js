const fs   = require('fs');
const path = require('path');

// Helper: read users from JSON file
const readUsers = () => {
  const filePath = path.join(__dirname, '../data/users.json');
  const data     = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// ─── GET /api/users ────────────────────────────────────────────────────────────
const getUsers = (req, res, next) => {
  try {
    const users = readUsers();
    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/users/:userId ────────────────────────────────────────────────────
const getUserById = (req, res, next) => {
  try {
    const users = readUsers();
    const user  = users.find(u => u.id === req.params.userId);

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/users/:userId/gigs ───────────────────────────────────────────────
// Get all gigs posted by a specific user — shows nested route path
const getUserGigs = (req, res, next) => {
  try {
    const users = readUsers();
    const user  = users.find(u => u.id === req.params.userId);

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    // Read gigs and filter by this user
    const gigsPath = path.join(__dirname, '../data/gigs.json');
    const allGigs  = JSON.parse(fs.readFileSync(gigsPath, 'utf-8'));
    const userGigs = allGigs.filter(g => g.postedBy === req.params.userId);

    res.status(200).json({ success: true, user: user.name, count: userGigs.length, gigs: userGigs });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUserById, getUserGigs };
