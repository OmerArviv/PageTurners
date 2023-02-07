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
            if (isValidDate()) {
                if (securityCode.length === 3) {
                    handleCloseModal();
                    sendOrder();
                }
                else {
                    alert('Please enter a valid security code');
                }
            }
            else {
                alert('Please enter a valid date');
            }
        }
        else {
            alert('Please enter a valid card number');
        }
    };

    const isValidDate = () => {
        if (expirationDate.length !== 5) {
            return false;
        }
        if ((expirationDate[0] === '0' && expirationDate[1] !== '0') || (expirationDate[0] === '1' && expirationDate[1] >= '0' && expirationDate[1] <= '2')) {
            if (expirationDate.substring(3, 5) >= 23) {
                return true;
            }
        }
        return false;
    }


    return (
        <form className="billing-form" onSubmit={handleSubmit}>
            <img src="//www.theorchardcottage.co.nz/wp-content/uploads/2018/09/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png" alt="Mastercard logo" className="billing-logo" />
            <div className="form-field">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                    type="text"
                    id="cardNumber"
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
                    type="text"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={(event) => {
                        let value = event.target.value;
                        if (!isNaN(value.replace(/\s/g, ''))) {
                            value = value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1 ').trim();
                            if (value.length <= 5) {
                                setExpirationDate(value);
                            }
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
                        if (!isNaN(value) && value.length <= 3) {
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
