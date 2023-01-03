const express = require('express');
const booksController = require('../controllers/booksController');
const router = express.Router();

router.route('/')
    .get(booksController.getAllBooks)
    .post(booksController.saveNewOrder)

router.route('/p/:name')
    .get(booksController.getBookByName)

module.exports = router;