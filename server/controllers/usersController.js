const User = require('../models/user');
const Config = require('../config/roles');
const Response = require('../config/response')

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ "status": Response.user.queryError });
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ "status": Response.user.queryError });
    }
}

const createNewUser = async (req, res) => {
    const user = new User({
        email: req.body.email,
        role: Config.ROLES.guest
    });

    try {
        await user.save();

        res.status(200).json({ "status": "New user was added" });
    } catch (err) {
        res.status(500).json({ "status": Response.user.creationError });
    }
}

const updateUser = async (req, res) => {
    const newData = {
        "role": req.body["0"]
    }

    try {
        User.updateOne({ 'email': req.params.email }, { $set: newData }, function (err, response) {
            if (err) {
                res.status(500).json({ "error": Response.user.queryError })
            }
            else {
                res.status(200).json({ "status": "User has been updated" })
            }
        });
    }
    catch (err) {
        res.status(500).json({ "error": Response.user.queryError })
    }
}

// Will delete a user from the system
const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ "_id": req.params.id });

        res.status(200).json({ "status": "User deleted!" });
    }
    catch (err) {
        res.status(500).json({ "error": Response.user.deleteError })
    }
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    createNewUser,
    updateUser,
    deleteUser
}