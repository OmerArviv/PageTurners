import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import './Book.css';
import { Link } from 'react-router-dom';

export default class Book extends Component {
    render() {
        const { onAddItem } = this.props;

        return (
            <div className='card-container'>
                <Card className="card">
                    <Card.Img src={this.props.book.image} className="card_image" />
                    <Card.Body className='card-body'>
                        <Card.Title><Link to={`/book/${this.props.book.title}`}>{this.props.book.title}</Link></Card.Title>
                        <Card.Text>
                            {this.props.book.price}  ₪ <br />
                            written by: {this.props.book.author}
                        </Card.Text>
                        <Button className='btn_addtocart' onClick={() => onAddItem(this.props.book)}>Add to Cart</Button>
                        <br />
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
