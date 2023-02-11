const Order = require('../models/order');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('books.prod');
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
};

module.exports = {
    getAllOrders
};