import React from 'react';
import './Basket.css'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../store/auth-context';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BillingForm from './BillingForm';

function Basket(props) {
    const { CartItems, onAddItem, onRemoveItem, sendOrder } = props;
    const itemsPrice = CartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const authCtx = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleSendOrder = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigateLogin = () => {
        handleClose()
        navigate('/login')
    }

    const checkLoginAndSendOrder = () => {
        if (authCtx.isLoggedIn) {
            handleSendOrder();
        } else {
            handleShow()
        }
    }

    return (
        <div className='CartItems'>
            <h2>Cart Items</h2>
            <div>
                {CartItems.length === 0 && <div>Cart is Empty </div>}
            </div>
            <div>
                {CartItems.map((item) => (
                    <div key={item.title}>
                        <div><strong>{item.title}</strong></div>
                        <div>
                            <button onClick={() => onAddItem(item)} className="add">+</button>
                            <button onClick={() => onRemoveItem(item)} className="remove">-</button>
                        </div>
                        <div>
                            {item.qty} X ₪ {item.price.toFixed(2)}
                        </div>
                    </div>
                ))}
                {CartItems.length !== 0 && (
                    <div>
                        <div>Items Price: <strong>₪ {itemsPrice.toFixed(2)}</strong></div>
                        <br />
                        <button onClick={() => checkLoginAndSendOrder()} className='btn_buyitems'>Send Order</button>
                    </div>

                )}
            </div>
            {
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please login before purchase</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Great buy! Let's log you in before sending your order</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={navigateLogin}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
            {
                <Modal show={showModal} >
                    <BillingForm handleCloseModal={handleCloseModal} sendOrder={sendOrder} />
                </Modal>
            }
        </div>
    );
}

export default Basket;