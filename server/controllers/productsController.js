const Product = require('../models/product');
const Order = require('../models/order');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ "error": err });
    }
}

const getProductByName = async (req, res) => {
    const prod = await Product.findOne({
        "name": req.params.name
    })
    res.status(200).json(prod);
}

const saveNewOrder = async (req, res) => {
    const orders = req.body
    const allProducts = []
    let totalCost = 0;
    orders.forEach(element => {
        const el = JSON.parse(element)
        const newProduct = new Product({
            name: el.name,
            description: el.description,
            price: el.price,
            image: el.image,
        })
        allProducts.push({ prod: newProduct, qty: el.qty })
        totalCost = totalCost + (el.price * el.qty)
    });

    const newOrder = new Order({
        products: allProducts
        totalcost: totalCost
    })

    try {
        await newOrder.save();

        res.status(200).json({ "status": "New order was added" });
        console.log("Order saved in orders database :) ")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "status": "Failed to add new order" });
    }
}

module.exports = {
    getAllProducts,
    getProductByName,
    saveNewOrder
}