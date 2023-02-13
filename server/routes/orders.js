const express = require('express');
const ordersController = require('../controllers/ordersController');
const router = express.Router();

router.route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.saveNewOrder)

router.route('/getMostProfitableBooks/:limit')
    .get(ordersController.getMostProfitableBooks);

router.route('/:id')
    .put(ordersController.updateOrder)
    .delete(ordersController.deleteOrder)

module.exports = router;