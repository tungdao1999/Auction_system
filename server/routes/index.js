const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');

const router = express.Router();
router.route("/auth", authRoutes)

module.exports = router
