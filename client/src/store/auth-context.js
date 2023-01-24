import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    email: '',
    isLoggedIn: false,
    login: (token, email) => {
    },
    logout: () => {
    },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const userIsLogin = !!token;

    const loginHandler = (token, email) => {
        setToken(token);
        setEmail(email);
    }
    const logoutHandler = () => {
        setToken(null);
        setEmail(null);
    }

    const contextValue = {
        token: token,
        email: email,
        isLoggedIn: userIsLogin,
        login: loginHandler,
        logout: logoutHandler
    };


    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>

}

export default AuthContext;