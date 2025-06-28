const express = require('express');
const authRoutes = require('./auth.route');
const itemRoutes = require('./item.route');

const router = express.Router();
router.use("/auth", authRoutes)
router.use("/item", itemRoutes);

module.exports = router;
