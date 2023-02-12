const Book = require('../models/book');
const Response = require('../config/response');

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    }
    catch (err) {
        res.status(500).json({ "status": Response.book.queryError });
    }
}

const getBookByTitle = async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.params.title });
        res.status(200).json(book);
    }
    catch (err) {
        res.status(500).json({ "status": Response.book.queryError });
    }
}

const saveNewBook = async (req, res) => {
    const newBook = new Book({
        author: req.body.author,
        publisher: req.body.publisher,
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
    });

    try {
        await newBook.save();

        res.status(200).json({ "status": "New book was added" });
    } catch (err) {
        res.status(500).json({ "status": Response.book.creationError });
    }
}

const updateBookByTitle = async (req, res) => {
    const { newTitle, author, price } = req.body;

    try {
        await Book.updateOne({ title: req.params.title }, {
            title: newTitle,
            author: author,
            price: price
        });

        res.status(200).json({ "status": "Book details updated" });
    }
    catch (err) {
        res.status(500).json({ "status": Response.book.deleteError });
    }
}

// Will delete a book from the system
const deleteBookByTitle = async (req, res) => {
    try {
        await Book.deleteOne({ "title": req.params.title });

        res.status(200).json({ "status": "Book deleted!" });
    }
    catch (err) {
        res.status(500).json({ "status": Response.book.deleteError })
    }
}

module.exports = {
    getAllBooks,
    getBookByTitle,
    saveNewBook,
    updateBookByTitle,
    deleteBookByTitle
}