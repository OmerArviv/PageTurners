import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';


function ErrorPage(props) {

    const imgAdress = "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
    return (

        <div>
            <h1 className='error-title'>Oops! The page you're looking for can't be found</h1>
            <img src={imgAdress} alt={"errorImage"} className="error-image" />
            <Link to={"/"} className="error-back-button">Back to homepage</Link>
        </div>
    );
}

export default ErrorPage;