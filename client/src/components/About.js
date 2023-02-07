import React from 'react';
import './About.css';

function About(props) {
    return (
        <div className='about'>
            <div className="about-container">
                <h1 className="about-header">About PageTurners</h1>
                <p className="about-text">
                    PageTurners is a book store that has been providing quality reading materials to book lovers for many years. Our store is dedicated to fostering a love of reading in all of our customers. Whether you are a seasoned reader or just starting to explore the world of books, we have something for everyone.
                </p>
                <p className="about-text">
                    Our knowledgeable staff is always on hand to help you find the perfect book for your reading needs. We carefully curate our selection of books to ensure that we have a diverse range of genres and styles for our customers to choose from. From best-selling novels to obscure works of poetry, you are sure to find something you love at PageTurners.
                </p>
                <p className="about-text">
                    At PageTurners, we believe that reading should be accessible and affordable for everyone. That's why we offer competitive prices on all of our books and regularly host events and promotions to help you get the most out of your reading experience.
                </p>
                <p className="about-text">
                    So why wait? Head on over to PageTurners today and start exploring our vast selection of books. Whether you're looking for your next great read or just want to spend some time surrounded by books, we are here for you.
                </p>
            </div>
        </div>
    );
}

export default About;