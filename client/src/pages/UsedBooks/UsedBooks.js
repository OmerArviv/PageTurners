import React from 'react';
import Counter from './Counter';
import './UsedBooks.css';

export default function UsedBooks() {
    return (
        <div className='usedBooks'>
            <div className="usedBooks-container">
                <h1 className="usedBooks-header">Do you have any used books that you don't need ?</h1>
                <p className="usedBooks-text">
                    Donating used books benefits the community by supporting literacy and reducing waste. Your generosity can make a positive impact by providing access to books for those in need and spreading the joy of reading. Consider donating to a local library, school, or charity.                </p>
                <Counter />
            </div>
        </div>
    )
}
