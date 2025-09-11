const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/loginBuyer', authController.loginBuyer);
router.post('/loginSeller', authController.loginSeller);
router.post('/registerSeller', authController.registerSeller);
router.post('/registerBuyer', authController.registerBuyer);
router.get('/testAuth', authController.testAuth);

module.exports = router;