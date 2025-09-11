const bidController = require('../controllers/bid.controller');
const express = require('express');
const router = express.Router();
const buyerAuthenticate = require('../middlewares/auth.buyer.middleware');

// Route to create a bid
router.post('/createBid', buyerAuthenticate, bidController.createBid);

module.exports = router;