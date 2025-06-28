const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auction.controller');
const sellerAuthenticate = require('../middlewares/auth.seller.middleware');

router.post('/createAuction', sellerAuthenticate, auctionController.createAuction);
