const mongoose = require('mongoose')
const Config = require('../config/roles')

var schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        enum: Config.ROLES,
        default: Config.ROLES.guest
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("User", schema, "User");