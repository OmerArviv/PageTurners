import React, { useState } from 'react';
import './BillingForm.css';

const BillingForm = (props) => {
    const { handleCloseModal, sendOrder } = props;
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleCloseModal();
        sendOrder();
        console.log(cardNumber, expirationDate, securityCode);
    };

    return (
        <form className="billing-form" onSubmit={handleSubmit}>
            <img src="//www.theorchardcottage.co.nz/wp-content/uploads/2018/09/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png" alt="Mastercard logo" className="billing-logo" />
            <div className="form-field">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="expirationDate">Expiration Date:</label>
                <input
                    type="text"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={(event) => setExpirationDate(event.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="securityCode">Security Code:</label>
                <input
                    type="text"
                    id="securityCode"
                    value={securityCode}
                    onChange={(event) => setSecurityCode(event.target.value)}
                />
            </div>
            <button type="submit" >Submit</button>
        </form>
    );
};

export default BillingForm;
