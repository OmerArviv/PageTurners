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
    try {
        const book = await Book.findOne({ title: req.params.title });
        res.status(200).json(book);
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
}

const saveNewOrder = async (req, res) => {
    const orders = req.body
    const allBooks = []
    let totalCost = 0;
    orders.forEach(element => {
        const el = JSON.parse(element)
        const newBook = new Book({
            title: el.title,
            price: el.price,
            image: el.image,
            author: el.author
        })
        allBooks.push({ prod: newBook, qty: el.qty })
        totalCost = totalCost + (el.price * el.qty)
        console.log(newBook)
    });

    const newOrder = new Order({
        books: allBooks,
        totalcost: totalCost
    })

    console.log(newOrder)

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