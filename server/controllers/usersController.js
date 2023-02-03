const User = require('../models/user');
const Config = require('../config/roles');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json(user._id);
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
}

const createNewUser = async (req, res) => {
    const user = new User({
        email: req.body.email,
        role: Config.ROLES.guest
    });

    console.log(user)

    try {
        await user.save();

        res.status(200).json({ "status": "New user was added" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ "status": "Failed to create new user" });
    }
}

const updateUser = async (req, res) => {
    var newData = {
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

// Will delete a user from the system - Admin only
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