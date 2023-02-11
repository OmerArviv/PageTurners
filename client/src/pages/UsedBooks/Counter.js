import React, { useContext, useState } from 'react';
import useCounter from './useCounter';
import './Counter.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../../store/auth-context';

function Counter() {
    const [count, increment, decrement] = useCounter();
    const authCtx = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();


    const submitHandler = () => {
        alert('Thank you for donating ' + count + ' books, we will be in touch with you via email');
        navigate('/');
    }


    const handleClose = () => setShow(false);

    const navigateLogin = () => {
        handleClose()
        navigate('/login')
    }

    const checkLoginAndDonate = () => {
        if (authCtx.isLoggedIn) {
            submitHandler();
        } else {
            setShow(true);
        }
    }

    return (
        <div>
            <div className='custom-counter'>
                <p className='custom-count'>Books: {count}</p>
                <button className='custom-button' onClick={increment}>+</button>
                <button className='custom-button' onClick={decrement}>-</button>
            </div>
            <button className='submit-button' onClick={checkLoginAndDonate}>Submit</button>
            {
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please login before donating</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Thank you for your kindness! Let's log in before sending your donation</Modal.Body>
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
        </div >
    );
}

export default Counter;