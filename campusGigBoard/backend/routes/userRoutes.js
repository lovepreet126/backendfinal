const express = require('express');
const router  = express.Router();

const { getUsers, getUserById, getUserGigs } = require('../controllers/userController');


router.use((req, res, next) => {
  console.log(`[USER ROUTER] ${req.method} ${req.url}`);
  next();
});


router.get('/',                  getUsers);     
router.get('/:userId',           getUserById);  
router.get('/:userId/gigs',      getUserGigs);  

module.exports = router;
