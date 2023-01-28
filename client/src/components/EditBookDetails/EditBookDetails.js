import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./EditBookDetails.css";

const EditBookDetails = (props) => {
    const [book, setBook] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const titleInputRef = useRef();
    const authorInputRef = useRef();
    const priceInputRef = useRef();

    const {title} = props;

    useEffect(() => {
        axios.get(`http://localhost:5000/books/getBook/${title}`)
            .then(res => {
                setBook(res.data);
            })
            .catch(error => {
                console.log(error);
            });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isEditing) {
            initiateBookDetails();
        }
        // eslint-disable-next-line
    }, [isEditing]);

    const initiateBookDetails = () => {
        titleInputRef.current.value = book.title;
        authorInputRef.current.value = book.author;
        priceInputRef.current.value = book.price;
    }

    const handleEditClick = () => {
        setIsEditing(prevState => !prevState);
    }

    const handleSaveClick = (event) => {
        event.preventDefault();

        const newTitle = titleInputRef.current.value;
        const author = authorInputRef.current.value;
        const price = priceInputRef.current.value;

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                newTitle: newTitle,
                author: author,
                price: price
            })
        };

        fetch(`http://localhost:5000/books/updateBook/${book.title}`, requestOptions);
        setBook({
            title: newTitle,
            author: author,
            price: price,
            image: book.image
        });

        alert("Book details updated");
        setIsEditing(false);
    }

    return (

        <form onSubmit={handleSaveClick} className="book-details-container">
            <img src={book.image} alt={book.title} className="book-cover"/>
            <div className="book-info">
                {
                    isEditing ?
                        <>
                            <div className="control">
                                <label className="book-title">Title</label>
                                <input id="title" required ref={titleInputRef}/>
                            </div>
                            <div className="control">
                                <p className="book-author">Author</p>
                                <input id="author" required ref={authorInputRef}/>
                            </div>
                            <div className="control">
                                <p className="book-price">Price</p>
                                <input id="price" type="number" required ref={priceInputRef}/>
                            </div>
                        </>
                        :
                        <>
                            <h2 className="book-name">{book.title}</h2>
                            <p className="book-author">Author: {book.author}</p>
                            <p className="book-price">Price: {book.price}₪</p>
                        </>
                }

            </div>
            <div className="buttons">
                <button type="button" className="btn btn-warning" onClick={handleEditClick}>
                    {isEditing ? "Cancel" : "Edit"}
                </button>
                <button className="btn btn-success" disabled={!isEditing}>
                    Save
                </button>
            </div>
        </form>

    )
}

export default EditBookDetails;