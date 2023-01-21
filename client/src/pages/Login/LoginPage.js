import React from "react";
import {useState, useRef, useContext} from 'react';
import AuthContext from '../../store/auth-context';
import {useNavigate} from 'react-router-dom';
import classes from './LoginPage.module.css';

const LoginPage = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    // const history = useNavigate();
    const authCtx = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
    const API_SIGN_IP_ROUTE = "signInWithPassword";
    const API_SIGN_UP_ROUTE = "signUp";
    const apiKey = process.env.REACT_APP_API_KEY;

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        setIsLoading(true);
        let url;

        if (isLogin) {
            url = `${API_BASE_URL}${API_SIGN_IP_ROUTE}?key=${apiKey}`;
        } else {
            url = `${API_BASE_URL}${API_SIGN_UP_ROUTE}?key=${apiKey}`;
        }
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
            setIsLoading(false);
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    let errorMessage = 'Auth failed';

                    throw new Error(errorMessage);
                });
            }
        }).then((data) => {
            authCtx.login(data.idToken);
            // until routes will be, just show success message (after that, delete alert("Login succeeded"))!
            alert("Login succeeded")
            // history.replace('/');
        }).catch(err => {
            alert(err.message);
        });
    }

    return (
        <section className={classes.auth}>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <div className={classes.labelDiv}>
                        <label htmlFor='email'>Email</label>
                    </div>
                    <div className={classes.inputDiv}>
                        <input type='email' id='email' required ref={emailInputRef}/>
                    </div>
                </div>
                <div className={classes.control}>
                    <div className={classes.labelDiv}>
                        <label htmlFor='password'>Password</label>
                    </div>
                    <div className={classes.inputDiv}>
                        <input type='password' id='password' minLength="7" required ref={passwordInputRef}/>
                    </div>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {
                        isLoading && <p> Loading ... </p>
                    }
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;