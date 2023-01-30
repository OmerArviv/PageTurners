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

const getBookByTitle = async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.params.title });
        res.status(200).json(book);
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
}

const updateBookByTitle = async (req, res) => {
    const {newTitle, author, price} = req.body;

    try {
        await Book.updateOne({title: req.params.title}, {
            title: newTitle,
            author: author,
            price: price
        });
        res.status(200).json({ "status": "Book details updated" });
        console.log("Book details updated in books database :) ")
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
}

const saveNewOrder = async (req, res) => {
    const orders = req.body.orderData
    const allBooks = []
    let totalCost = 0;
    orders.forEach(element => {
        const el = JSON.parse(element)
        const newBook = new Book({
            title: el.title,
            price: el.price,
            image: el.image,
            author: el.author,
            publisher: el.publisher
        })
        allBooks.push({ prod: newBook, qty: el.qty })
        totalCost = totalCost + (el.price * el.qty)
        console.log(newBook)
    });

    const newOrder = new Order({
        books: allBooks,
        totalcost: totalCost,
        user: req.body.user
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
    getBookByTitle,
    updateBookByTitle,
    saveNewOrder
}