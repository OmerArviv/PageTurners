const express = require('express');
const app = express();
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const http = require('http');
const axios = require('axios');
const axiosRetry = require('axios-retry');
const cors = require("cors");
require('dotenv/config');
const { Server } = require("socket.io");

let userCount = 0;

axiosRetry(axios, {
    retries: 12, // number of retries
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
        if (error && error.response && error.response.status && error.response.status === 404) return false;
        return true;
    },
});

const corsOptions = {
    origin: '*',
    credentials: true,            // access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
    userCount++;
    console.log(`user count = ${userCount}`)
    io.emit("userCountUpdate", userCount);
    socket.on('disconnect', function () {
        console.log(`User disconnected: ${socket.id}`);
        userCount--;
        console.log(`user count = ${userCount}`);
        io.emit("userCountUpdate", userCount);

    });
})


// Routers
const booksRoute = require('./routes/books');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');

const Book = require('./models/book');

app.use('/books', booksRoute)
app.use('/users', usersRoute)
app.use('/orders', ordersRoute)

const checkBookImage = (book) => {
    return axios.get(book.image, { timeout: 60000 })
        .then(() => {
            axios.post("http://localhost:5000/books/", book)
        })
        .catch(() => {
            // Ignore on purpose
        })
}

const addBooks = (query, numToAdd) => {
    return axios.get(`https://openlibrary.org/search.json?q=${query}`, { timeout: 60000 })
        .then(async res => {
            const books = res.data.docs;

            for (i = 0; i < numToAdd; i++) {
                if (!books[i]) {
                    break;
                }

                if (books[i].author_name && books[i].title && books[i].publisher && books[i].publisher[0] && books[i].publisher[0].length > 0 && books[i].isbn && await Book.findOne({ "title": books[i].title }) == null) {
                    const payload = {
                        author: books[i].author_name[0],
                        publisher: books[i].publisher[0],
                        title: books[i].title,
                        price: Math.floor(Math.random() * (80 - 40) + 40),
                        image: `https://covers.openlibrary.org/b/isbn/${books[i].isbn[0]}-M.jpg`
                    }

                    await checkBookImage(payload);
                }
            }
        });
}

const startListen = () => {
    server.listen(process.env.PORT, () => {
        console.log(`Listening on PORT: ${process.env.PORT}`)
    });
}

// This method will initialize the DB if required
const initDbAndStart = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(`mongodb${process.env.prod}://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbHost}`, () => {
        console.log('Mongoose connected!');

        // To Count Documents of a particular collection
        mongoose.connection.db.collection('Book').count(async function (err, count) {

            // No records found, need to initialize
            if (count == 0) {
                // Go over the alphabet and insert 100 random books
                let alphaNum = 0;
                let currentCount = 0;
                while (currentCount < 100) {
                    await addBooks(String.fromCharCode(97 + alphaNum), 100 - currentCount);
                    alphaNum = alphaNum + 1;
                    currentCount = await Book.countDocuments({}).exec();
                }
            }
            startListen();
        })
    });
}

initDbAndStart();
