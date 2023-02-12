const express = require('express');
const ordersController = require('../controllers/ordersController');
const router = express.Router();

router.route('/')
    .get(ordersController.getAllOrders);

router.route('/getMostProfitableBooks/:limit')
    .get(ordersController.getMostProfitableBooks);

module.exports = router;