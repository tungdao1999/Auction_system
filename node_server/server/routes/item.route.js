const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const sellerAuthenticate = require('../middlewares/auth.seller.middleware');
const buyerAuthenticate = require('../middlewares/auth.buyer.middleware');
const authenticate = require("../middlewares/auth.middleware");

router.get('/getAllItems', buyerAuthenticate, itemController.getAllItems);
router.get("/getRelatedItems/:auctionId", authenticate, itemController.getRelatedItems);
router.post('/createItem', sellerAuthenticate, itemController.createItem);

module.exports = router;


