const Order = require('../models/order');

const getAllOrders = async (req, res) => {
    try {
        const users = await Order.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
};

module.exports = {
    getAllOrders
};