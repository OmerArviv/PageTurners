import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './LoginPage.css';
import Form from './Form';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const authCtx = useContext(AuthContext);
    const [option, setOption] = useState(1);
    const navigate = useNavigate();



    const API_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
    const API_SIGN_IP_ROUTE = "signInWithPassword";
    const API_SIGN_UP_ROUTE = "signUp";
    const apiKey = process.env.REACT_APP_API_KEY;

    const submitHandler = (event, emailInputRef, passwordInputRef) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        let url;

        if (option === 1) {
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
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Auth failed';

                        throw new Error(errorMessage);
                    });
                }
            }).then((data) => {
                const token = data.idToken;

                if (option === 2) {
                    authCtx.login(token, enteredEmail);
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        mode: 'cors',
                        body: JSON.stringify({
                            email: enteredEmail
                        })
                    };

                    fetch('http://localhost:5000/users/', requestOptions);
                } else {
                    const requestOptions = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        mode: 'cors'
                    }

                    fetch("http://localhost:5000/users/getUser/" + enteredEmail, requestOptions).then(res => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            return res.json().then((data) => {
                                let errorMessage = 'Auth failed';

                                throw new Error(errorMessage);
                            });
                        }
                    }).then((data) => {
                        authCtx.login(token, enteredEmail, data.role);
                        navigate('/')
                    })
                }
                // history.replace('/');
            }).catch(err => {
                alert(err.message);
            });
    }

    return (
        <div id="app">
            <div className='container' id="auth-container">
                <header>
                    <div className={'header-headings ' + (option === 1 ? 'sign-in' : 'sign-up')}>
                        <span>Sign in to your account</span>
                        <span>Create an account</span>
                    </div>
                </header>
                <ul className='options'>
                    <li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>Sign in</li>
                    <li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Sign up</li>
                </ul>
                <Form option={option} onClickResult={submitHandler} />
            </div>
        </div>
    );
};

export default LoginPage;