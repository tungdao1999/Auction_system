const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auction.controller');
const sellerAuthenticate = require('../middlewares/auth.seller.middleware');
const buyerAuthenticate = require('../middlewares/auth.buyer.middleware');

router.post('/createAuction', sellerAuthenticate, auctionController.createAuction);
router.get('/getRunningAuction', buyerAuthenticate, auctionController.getRunningAuction);

module.exports = router;