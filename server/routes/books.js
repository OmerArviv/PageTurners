const express = require('express');
const booksController = require('../controllers/booksController');
const router = express.Router();

router.route('/')
    .get(booksController.getAllBooks)
    .post(booksController.saveNewBook)

router.route('/getBook/:title')
    .get(booksController.getBookByTitle)

router.route('/updateBook/:title')
    .post(booksController.updateBookByTitle)
    .delete(booksController.deleteBookByTitle)

module.exports = router;