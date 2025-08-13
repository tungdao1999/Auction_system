const express = require('express');
const authRoutes = require('./auth.route');
const itemRoutes = require('./item.route');
const auctionRoutes = require('./auction.route');
const bidRoutes = require('./bid.route');

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/item", itemRoutes);
router.use("/auction", auctionRoutes);
router.use("/bid", bidRoutes);

module.exports = router;
