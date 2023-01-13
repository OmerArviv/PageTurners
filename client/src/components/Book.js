import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import './Book.css';

export default class Book extends Component {
    render() {
        const { onAddItem } = this.props;

        return (
            <div>
                <Card className="card">
                    <Card.Img src={this.props.book.image} className="card_image" />
                    <Card.Body>
                        <Card.Title>{this.props.book.title}</Card.Title>
                        <Card.Text>
                            {this.props.book.price}  ₪ <br />
                            written by: {this.props.book.author}
                        </Card.Text>
                        <Button className='btn_addtocart' onClick={() => onAddItem(this.props.book)}>Add to Cart</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
