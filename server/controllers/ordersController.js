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

const getMostProfitableBooks = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            { $unwind: "$books" },
            { $lookup: { "from": "Book", "localField": "books.prod", "foreignField": "_id", "as": "book" } },
            { $group: { _id: { $first: "$book._id" }, book: { $first: "$book" }, total: { $sum: { $multiply: [{ $first: "$book.price" }, "$books.qty"] } } } },
            { $sort: { total: -1 } },
            { $limit: parseInt(req.params.limit) }
        ])

        res.status(200).json(orders);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "error": err });
    }
}

module.exports = {
    getAllOrders,
    getMostProfitableBooks
};