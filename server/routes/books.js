const express = require('express');
const booksController = require('../controllers/booksController');
const router = express.Router();

router.route('/')
    .get(booksController.getAllBooks)
    .post(booksController.saveNewOrder)

router.route('/p/:title')
    .get(booksController.getBookByTitle)

module.exports = router;