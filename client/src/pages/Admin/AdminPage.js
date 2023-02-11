import axios from "axios";
import {useEffect, useState} from "react";
import EditBookDetails from "../../components/EditBookDetails/EditBookDetails";
import BooksChart from "../../components/BooksChart/BooksChart";
import "./AdminPage.css";

const AdminPage = () => {
    const [books, setBooks] = useState([]);
    const [inFirstTab, setInFirstTab] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/books/")
            .then(res => {
                setBooks(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    const handleFirstTabClick = () => {
        setInFirstTab(true);
    };

    const handleSecondTabClick = () => {
        setInFirstTab(false);
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
        <div className="books-container">
            {
                inFirstTab
                    ? books.map((book, index) =>
                        <EditBookDetails key={index} title={book.title}/>
                    )
                    : <BooksChart/>

            }
        </div>
    </div>
};

export default AdminPage;