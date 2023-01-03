const Book = require('../models/book');
const Order = require('../models/order');

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
}

const getBookByName = async (req, res) => {
    const prod = await Book.findOne({
        "name": req.params.name
    })
    res.status(200).json(prod);
}

const saveNewOrder = async (req, res) => {
    const orders = req.body
    const allBooks = []
    let totalCost = 0;
    orders.forEach(element => {
        const el = JSON.parse(element)
        const newBook = new Book({
            name: el.name,
            summary: el.summary,
            price: el.price,
            image: el.image,
            author: el.author
        })
        allBooks.push({ prod: newBook, qty: el.qty })
        totalCost = totalCost + (el.price * el.qty)
    });

    const newOrder = new Order({
        products: allBooks
        totalcost: totalCost
    })

    try {
        await newOrder.save();

        res.status(200).json({ "status": "New order was added" });
        console.log("Order saved in orders database :) ")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "status": "Failed to add new order" });
    }
}

module.exports = {
    getAllBooks,
    getBookByName,
    saveNewOrder
}