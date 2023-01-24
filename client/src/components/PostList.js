import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './PostList.css';
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

class PostList extends Component {

    openModal = (product) => {
        this.setState({ product: product });
    };
    closeModal = () => {
        this.setState({ product: null });
    };

    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            product: null
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5000/books/")
            .then(res => {
                this.setState({ posts: res.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const posts = this.state.posts
        const { onAddItem } = this.props
        const product = this.state.product;

        return (
            <div className='container'>
                <Row md={1} lg={2} xl={3} xxl={4} className="g-4">
                    {
                        posts.length ?
                            posts.map(post =>
                                <Col>
                                    <div key={post.title} className="ListItem">
                                        <Card className="card">
                                            <Card.Img href={"#" + post.title} onClick={() => this.openModal(post)} src={post.image} className="card_image" />
                                            <Card.Body className='card-body'>
                                                <Card.Title href={"#" + post.title} onClick={() => this.openModal(post)}>{post.title}</Card.Title>
                                                <Card.Text className="card-text">
                                                    {post.price} ₪
                                                </Card.Text>
                                                <Button className='btn_addtocart' onClick={() => onAddItem(post)}>Add to Cart</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Col>
                            ) :
                            null
                    }
                </Row>
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>
                                    x
                                </button>
                                <div className="product-details">
                                    <img src={product.image.replace("-M.jpg", "-L.jpg")} alt={product.title}></img>
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        Written by: {product.author}
                                    </p>
                                    <p>
                                        Published by: {product.publisher}
                                    </p>
                                    <div className="product-price">
                                        <div>{product.price}₪</div>
                                        <button
                                            className="button primary"
                                            onClick={() => {
                                                onAddItem(product);
                                                this.closeModal();
                                            }}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div >
        )
    }
}

export default PostList

