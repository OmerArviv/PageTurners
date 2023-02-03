import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './PostList.css';
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

const PostList = (props) => {

    const [posts, setPosts] = useState([]);
    const [maxPrice, setMaxPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [product, setProduct] = useState(null);
    const [sortDirection, setSortDirection] = useState();
    let addBtn, cart;
    const speed = 200;

    function init() {
        addBtn = document.querySelectorAll("[data-addToCart]");
        cart = document.querySelector(".CartItems");
        console.log(`init ${addBtn}`);

        for (let btn of addBtn) {
            console.log(`add event`);

            btn.addEventListener("click", addItem);
        }
    }

    function addItem(e) {
        let imageToFly = e.currentTarget.parentNode.parentNode.querySelector('.card-img');
        let disLeft = imageToFly.getBoundingClientRect().left;
        let disTop = imageToFly.getBoundingClientRect().top;
        let cartleft = cart.getBoundingClientRect().left;
        let carttop = cart.getBoundingClientRect().top;
        let flyingBtn = imageToFly.cloneNode(true);

        flyingBtn.style = 'z-index: 1111; width: 160px;opacity:0.8; position:fixed; top:' + disTop + 'px;left:' + disLeft + 'px;transition: left 2s, top 2s, width 2s, opacity 2s cubic-bezier(1, 1, 1, 1)';


        flyingBtn.classList.add("flyingBtn");

        let rechange = document.body.appendChild(flyingBtn);

        setTimeout(() => {
            flyingBtn.style.left = cartleft + 'px';
            flyingBtn.style.top = carttop + 'px';
            flyingBtn.style.width = '200px';
            flyingBtn.style.opacity = '0';
        }, speed);
        setTimeout(() => {
            rechange.parentNode.removeChild(rechange);
        }, speed * 10)
    }

    const openModal = (product) => {
        setProduct(product)
    };
    const closeModal = () => {
        setProduct(null)
    };

    useEffect(() => {
        axios.get("http://localhost:5000/books/")
            .then(res => {
                setPosts(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        function handleFilter() {
            let filtered = posts;
            if (maxPrice) {
                filtered = filtered.filter(post => post.price <= maxPrice);
            }
            if (author) {
                filtered = filtered.filter(post => post.author.toLowerCase().includes(author.toLowerCase()));
            }
            if (publisher) {
                filtered = filtered.filter(post => post.publisher.toLowerCase().includes(publisher.toLowerCase()));
            }
            setFilteredPosts(filtered);
        }
        handleFilter();
    }, [maxPrice, author, publisher, posts])

    const sortByTitle = () => {
        if (sortDirection === "ASC") {
            console.log("ASC")
            setFilteredPosts([...filteredPosts].sort((a, b) => (a.title > b.title ? 1 : -1)));
            setSortDirection("DESC");
        }
        else {
            console.log("DESC")
            setFilteredPosts([...filteredPosts].sort((a, b) => (a.title < b.title ? 1 : -1)));
            setSortDirection("ASC");
        }
    }

    const sortByPrice = () => {
        if (sortDirection === "ASC") {
            console.log("ASC")
            setFilteredPosts([...filteredPosts].sort((a, b) => (a.price > b.price ? 1 : -1)));
            setSortDirection("DESC");
        }
        else {
            console.log("DESC")
            setFilteredPosts([...filteredPosts].sort((a, b) => (a.price < b.price ? 1 : -1)));
            setSortDirection("ASC");
        }
    }

    init();
    return (
        <div className='postlist-container'>
            <div className='postlist-filters'>

                <span className='filter-label'>Max Price</span>
                <input
                    className='postlist-filter'
                    type="text"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={e => {
                        if (!isNaN(e.target.value)) {
                            setMaxPrice(e.target.value)
                        }
                    }}
                ></input>
                <span className='filter-label'>Author</span>
                <input
                    className='postlist-filter'
                    type="text"
                    name="author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                ></input>
                <span className='filter-label'>Publisher</span>
                <input
                    className='postlist-filter'
                    type="text"
                    name="publisher"
                    value={publisher}
                    onChange={e => { setPublisher(e.target.value) }}
                ></input>
            </div>
            <div className='postlist-filters'>
                <button onClick={() => sortByTitle()}>Sort by Title</button>
                <button onClick={() => sortByPrice()}>Sort by Price</button>

            </div>
            <Row md={1} lg={2} xl={3} xxl={4} className="g-1">
                {
                    filteredPosts.length ?
                        filteredPosts.map(post =>
                            <Col key={post.title}>
                                <div className="ListItem">
                                    <Card className="card">
                                        <Card.Img href={"#" + post.title} onClick={() => openModal(post)} src={post.image} className="card_image" />
                                        <Card.Body className='card-body'>
                                            <Card.Title href={"#" + post.title} onClick={() => openModal(post)}>{post.title}</Card.Title>
                                            <Card.Text className="card-text">
                                                {post.price} ₪
                                            </Card.Text>
                                            <Button className='btn_addtocart' data-addtocart onClick={() => props.onAddItem(post)}>Add to Cart</Button>
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
                    <Modal isOpen={true} onRequestClose={closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={closeModal}>
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
                                            props.onAddItem(product);
                                            closeModal();
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

export default PostList
