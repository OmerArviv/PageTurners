const mongoose = require('mongoose');

var schema = mongoose.Schema({
    books: [{             // List of all Books
        prod: {              // The Book
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model("Order", schema, "Order");