import axios from "axios";
import React, {useEffect, useState} from "react";
import EditBookDetails from "../../components/EditBookDetails/EditBookDetails";
import BooksChart from "../../components/BooksChart/BooksChart";
import "./AdminPage.css";

const ALL_USERS_OPTION = "All";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [inFirstTab, setInFirstTab] = useState(true);

    const [bookName, setBookName] = useState('');
    const [minProfit, setMinProfit] = useState('');
    const [user, setUser] = useState(ALL_USERS_OPTION);
    const [filteredBooks, setFilteredBooks] = useState([]);

    const [profitsByBook, setProfitsByBook] = useState(new Map());
    const [booksByUser, setBooksByUser] = useState(new Map());

    useEffect(() => {
        if(inFirstTab) {
            axios.get("http://localhost:5000/users/")
                .then(res => {
                    setUsers(res.data);
                    res.data.forEach(user => {
                        setBooksByUser(booksByUser.set(user.email, new Set()))
                    });

                    axios.get("http://localhost:5000/orders/")
                        .then(res => {
                            if (profitsByBook.size === 0) {
                                const orders = res.data;

                                orders.forEach(order => {
                                    order.books.forEach(bookOrder => {
                                        const bookDetails = bookOrder.prod;
                                        setProfitsByBook(profitsByBook.set(bookDetails.title, (profitsByBook.get(bookDetails.title) ?? 0)
                                            + bookDetails.price * bookOrder.qty));

                                        booksByUser.get(order.user.email).add(bookDetails.title);
                                    });
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error)
                });

            axios.get("http://localhost:5000/books/")
                .then(res => {
                    setBooks(res.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [inFirstTab]);

    useEffect(() => {
        if(inFirstTab) {
            let filtered = books;

            if (bookName) {
                filtered = filtered.filter(book => book.title.toLowerCase().includes(bookName.toLowerCase()));
            }
            if (minProfit && profitsByBook.size > 0) {
                filtered = filtered.filter(book => {
                    const profit = profitsByBook.get(book.title) ?? 0;
                    return profit >= minProfit;
                });
            }
            if (user !== ALL_USERS_OPTION && booksByUser.size > 0) {
                filtered = filtered.filter(book => {
                    const userBooks = booksByUser.get(user);
                    return userBooks.has(book.title);
                });
            }
            setFilteredBooks(filtered);
        }
    }, [minProfit, bookName, user, books, inFirstTab]);

    const handleFirstTabClick = () => {
        setInFirstTab(true);
    };

    const handleSecondTabClick = () => {
        setInFirstTab(false);
        setBooks([]);
        profitsByBook.clear();
        booksByUser.clear();
        setBookName('');
        setMinProfit('');
        setUser(ALL_USERS_OPTION);
    };

    return <div>
        <div className="tabs">
            <h2 className={`tab ${inFirstTab ? "selectedTab" : ""}`}
                onClick={handleFirstTabClick}
            >
                Books details
            </h2>
            <h2 className={`tab ${!inFirstTab ? "selectedTab" : ""}`}
                onClick={handleSecondTabClick}
            >
                Books chart
            </h2>
        </div>
        <div>
            {
                inFirstTab
                    ? <>
                        <div className='booksList-filters'>
                            <span className='filter-label'>Book</span>
                            <input className='booksList-filter'
                                   type="text"
                                   name="bookName"
                                   value={bookName}
                                   onChange={e => setBookName(e.target.value)}
                            />
                            <span className='filter-label'>Min profit</span>
                            <input className='booksList-filter'
                                   type="text"
                                   name="minProfit"
                                   value={minProfit}
                                   onChange={e => {
                                       if (!isNaN(e.target.value)) {
                                           setMinProfit(e.target.value)
                                       }
                                   }}
                            />
                            <span className='filter-label'>User</span>
                            <select name="user"
                                    value={user}
                                    onChange={e => setUser(e.target.value)}
                            >
                                <option>All</option>
                                {
                                    users.map(user =>
                                        <option key={user.email}>{user.email}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="books-container">
                            {
                                filteredBooks.map((book) =>
                                    <EditBookDetails key={book.image} bookToShow={book}/>
                                )
                            }
                        </div>
                    </>
                    : <BooksChart/>

            }
        </div>
    </div>
};

export default AdminPage;