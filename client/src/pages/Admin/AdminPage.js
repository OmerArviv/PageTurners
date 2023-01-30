import axios from "axios";
import {useEffect, useState} from "react";
import EditBookDetails from "../../components/EditBookDetails/EditBookDetails";
import "./AdminPage.css";

const AdminPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/books/")
            .then(res => {
                setBooks(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return <div className="books-container">
        {
            books.map((book, index) =>
                <EditBookDetails key={index} title={book.title}/>
            )
        }
    </div>
};

export default AdminPage;