const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)

router.route('/getUser/:email')
    .get(usersController.getUserByEmail)

router.route('/:id')
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router;