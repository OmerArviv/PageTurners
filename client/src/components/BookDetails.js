import React, { Component, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import './BookDetails.css';

function BookDetails() {

    const [data, setData] = useState({});

    const { title } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/books/getBook/${title}`)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (

        <div className="book-details-container">
            <img src={data.image} alt={data.title} className="book-cover" />
            <div className="book-info">
                <h2 className="book-name">{data.title}</h2>
                <p className="book-author">Author: {data.author}</p>
                <p className="book-price">Price: ${data.price}</p>
                <Link to={"/"} className="back-button">Back to homepage</Link>
            </div>
        </div>

    )
}

export default BookDetails
