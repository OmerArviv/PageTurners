const mongoose = require('mongoose');
const Book = require('./book').schema;

var schema = mongoose.Schema({
    books: [{             // List of all Books
        prod: {              // The Book
            type: Book,
            required: true
        },
        qty: {              // Quantity
            type: Number,
            required: true
        }
    }],
    totalcost: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Order", schema, "Order");