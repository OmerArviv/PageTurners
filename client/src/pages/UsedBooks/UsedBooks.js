import React from 'react';
import Counter from './Counter';
import './UsedBooks.css';

export default function UsedBooks() {
    return (
        <div className='usedBooks'>
            <div className="usedBooks-container">
                <h1 className="usedBooks-header">Do you have any used books that you don't need ?</h1>
                <p className="usedBooks-text">
                    PageTurners is a book store that has been providing quality reading materials to book lovers for many years. Our store is dedicated to fostering a love of reading in all of our customers. Whether you are a seasoned reader or just starting to explore the world of books, we have something for everyone.
                </p>
                <Counter />
            </div>
        </div>
    )
}
