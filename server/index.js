const express = require('express');
const app = express();
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const http = require('http').Server(app);
require('dotenv/config');

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            // access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

// Routers
const booksRoute = require('./routes/books');

app.use('/books', booksRoute)

mongoose.connect(`mongodb${process.env.prod}://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbHost}`)
http.listen(process.env.PORT || 5000);
mongoose.set('strictQuery', false);
