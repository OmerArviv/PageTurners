import React, { useState } from 'react';
import './BillingForm.css';

const BillingForm = (props) => {
    const { handleCloseModal, sendOrder } = props;
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cardNumber.length === 19) {
            if (securityCode.length === 4 || securityCode.length === 3) {
                handleCloseModal();
                sendOrder();
            }
            else {
                alert('Please enter a valid security code');
            }
        }
        else {
            alert('Please enter a valid card number');
        }
    };

    return (
        <form className="billing-form" onSubmit={handleSubmit}>
            <img src="//www.theorchardcottage.co.nz/wp-content/uploads/2018/09/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png" alt="Mastercard logo" className="billing-logo" />
            <span className='billing-exit' onClick={handleCloseModal}>
                X
            </span>
            <div className="form-field">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                    type="text"
                    id="cardNumber"
                    pattern='^(?:4\d{3}|5[1-5]\d{2}|6011|3[47]\d{2})([-\s]?)\d{4}\1\d{4}\1\d{3,4}$'
                    value={cardNumber}
                    onChange={event => {
                        let value = event.target.value;
                        if (!isNaN(value.replace(/\s/g, ''))) {
                            value = value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
                            if (value.length <= 19) {
                                setCardNumber(value);
                            }
                        }
                    }}
                />
            </div>
            <div className="form-field">
                <label htmlFor="expirationDate">Expiration Date:</label>
                <input
                    type="date"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={(event) => {
                        const date = new Date();
                        const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        const targetDate = new Date(event.target.value)
                        if (targetDate >= today) {
                            setExpirationDate(event.target.value);
                        }
                    }} />
            </div>
            <div className="form-field">
                <label htmlFor="securityCode">Security Code:</label>
                <input
                    type="text"
                    id="securityCode"
                    value={securityCode}
                    onChange={(event) => {
                        let value = event.target.value.replace(/\s/g, '');
                        if (!isNaN(value) && value.length <= 4) {
                            setSecurityCode(value)
                        }

                    }
                    }
                />
            </div>
            <button type="submit" >Submit</button>
        </form>
    );
};

export default BillingForm;
