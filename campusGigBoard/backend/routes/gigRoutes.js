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


router.use((req, res, next) => {
  console.log(`[GIG ROUTER] ${req.method} ${req.url}`);
  next();
});


router.get('/',                    getGigs);           
router.get('/category/:type',      getGigsByCategory); 
router.get('/:id',                 getGigById);       


router.post('/',     authCheck, createGig);  
router.put('/:id',   authCheck, updateGig);  
router.delete('/:id',authCheck, deleteGig); 

module.exports = router;
