const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const sellerAuthenticate = require('../middlewares/auth.seller.middleware');

router.get('/getAllItems', itemController.getAllItems);
router.post('/createItem', sellerAuthenticate, itemController.createItem);

module.exports = router;


