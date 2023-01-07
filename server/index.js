const express = require('express');
const app = express();
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const http = require('http').Server(app);
const axios = require('axios');
const axiosRetry = require('axios-retry');
require('dotenv/config');

axiosRetry(axios, {
    retries: 3, // number of retries
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
        // if retry condition is not specified, by default idempotent requests are retried
        return true;
    },
});

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
const Book = require('./models/book');

app.use('/books', booksRoute)

const addBooks = (query, numToAdd) => {
    return axios.get(`https://openlibrary.org/search.json?q=${query}`, { timeout: 60000 })
        .then(res => {
            const books = res.data.docs;
            let addedNum = 0;

            for (i = 0; i < numToAdd; i++) {
                if (!books[i]) {
                    break;
                }
                if (books[i].author_name && books[i].title && books[i].isbn) {
                    const newBook = new Book({
                        author: books[i].author_name[0],
                        title: books[i].title,
                        price: Math.floor(Math.random() * (80 - 40) + 40),
                        image: `https://covers.openlibrary.org/b/isbn/${books[i].isbn[0]}-M.jpg`,
                    });
                    newBook.save();
                    addedNum = addedNum + 1;
                }
            }

            return addedNum;
        });
}

const startListen = () => {
    http.listen(process.env.PORT, () => {
        console.log(`Listening on PORT: ${process.env.PORT}`)
    });
}

// This method will initialize the DB if required
const initDbAndStart = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(`mongodb${process.env.prod}://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbHost}`, () => {
        console.log('Mongoose connected!');

        // To Count Documents of a particular collection
        mongoose.connection.db.collection('Book').count(function (err, count) {
            // No records found, need to initialize
            if (count == 0) {
                addBooks('a', 100).then(res => {
                    // Not enough books were found, search for more with different query!
                    if (res < 100) {
                        addBooks('b', 100 - res).then(res => {
                            startListen();
                        })
                    }
                })
            } else {
                startListen();
            }
        });
    });
}

initDbAndStart();
