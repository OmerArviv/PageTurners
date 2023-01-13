const mongoose = require('mongoose')

var schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Book", schema, "Book");