const mongoose = require('mongoose');
const Product = require('./product').schema;

var schema = mongoose.Schema({
    products: [{             // List of all products - include quantity
        prod: {              // The product
            type: Product,
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