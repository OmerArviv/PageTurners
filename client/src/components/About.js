import React from 'react';
import './About.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function About(props) {
    return (
        <div className='about'>
            <div className="about-container">
                <Row className="about-header g-1">
                    <Col lg={12}>
                        <div className="title-heading mb-5">
                            <h3 className="mb-1 fw-light text-uppercase">About us</h3>
                            <div className="title-border-simple position-relative"></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <div className='about-box text-center p-4'>
                            <div className='about-icon mb-4'>
                                <span className="material-symbols-outlined">
                                    lightbulb
                                </span>
                            </div>
                            <h4 className="fw-light">
                                <a>Love books</a>
                            </h4>
                            <p className="text-black-50 f-15 line-h-26">
                                PageTurners is a book store that has been providing quality reading materials to book lovers for many years. Our store is dedicated to fostering a love of reading in all of our customers. Whether you are a seasoned reader or just starting to explore the world of books, we have something for everyone.
                            </p>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className='about-box text-center p-4'>
                            <div className='about-icon mb-4'>
                                <span className="material-symbols-outlined">
                                    diversity_2
                                </span>
                            </div>
                            <h4 className="fw-light">
                                <a>Diverse styles</a>
                            </h4>
                            <p className="f-15 text-black-50 line-h-26">
                                Our knowledgeable staff is always on hand to help you find the perfect book for your reading needs. We carefully curate our selection of books to ensure that we have a diverse range of genres and styles for our customers to choose from. From best-selling novels to obscure works of poetry, you are sure to find something you love at PageTurners.
                            </p>
                        </div>
                    </Col>

                    <Col lg={4}>
                        <div className='about-box text-center p-4'>
                            <div className='about-icon mb-4'>
                                <span className="material-symbols-outlined">
                                    sell
                                </span>
                            </div>
                            <h4 className="fw-light">
                                <a>Affordable</a>
                            </h4>
                            <p className="f-15 text-black-50 line-h-26">
                                At PageTurners, we believe that reading should be accessible and affordable for everyone. That's why we offer competitive prices on all of our books and regularly host events and promotions to help you get the most out of your reading experience.
                            </p>
                        </div>
                    </Col>
                </Row>
                <p className="about-text">
                    So why wait? Head on over to PageTurners today and start exploring our vast selection of books. Whether you're looking for your next great read or just want to spend some time surrounded by books, we are here for you.
                </p>
            </div>
        </div >
    );
}

export default About;