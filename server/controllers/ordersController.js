const Order = require('../models/order');
const Response = require('../config/response');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate(['books.prod', 'user']);
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ "status": Response.order.queryError });
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
        res.status(500).json({ "status": Response.order.queryError });
    }
}

const saveNewOrder = async (req, res) => {
    const orders = req.body.orderData
    const allBooks = []
    let totalCost = 0;
    orders.forEach(element => {
        const el = JSON.parse(element)
        allBooks.push({ prod: el._id, qty: el.qty })
        totalCost = totalCost + (el.price * el.qty)
    });

    const newOrder = new Order({
        books: allBooks,
        totalcost: totalCost,
        user: req.body.user
    })

    try {
        await newOrder.save();

        res.status(200).json({ "status": "New order was added" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ "status": "Failed to add new order" });
    }
}

const updateOrder = async (req, res) => {
    const newData = {
        "books": req.body["0"]
    }

    try {
        Order.updateOne({ 'email': req.params._id }, { $set: newData }, function (err, response) {
            if (err) {
                res.status(500).json({ "error": Response.order.queryError })
            }
            else {
                res.status(200).json({ "status": "Order has been updated" })
            }
        });
    }
    catch (err) {
        res.status(500).json({ "status": Response.order.queryError })
    }
}

// Will delete an order from the system
const deleteOrder = async (req, res) => {
    try {
        await Order.deleteOne({ "_id": req.params.id });

        res.status(200).json({ "status": "Order deleted!" });
    }
    catch (err) {
        res.status(500).json({ "status": Response.order.deleteError })
    }
}

module.exports = {
    getAllOrders,
    getMostProfitableBooks,
    saveNewOrder,
    updateOrder,
    deleteOrder
};