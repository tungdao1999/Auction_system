const express = require('express');
const router = express.Router();
const authController = require('./controllers/auth.controller');

router.post('/login', authController.login);
router.post('/registerSeller', authController.registerSeller);
router.post("/registerBuyer", authController.registerBuyer)

module.exports = router;