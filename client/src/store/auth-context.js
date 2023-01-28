import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    email: '',
    isLoggedIn: false,
    isAdmin: false,
    login: (token, email) => {
    },
    logout: () => {
    },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const userIsLogin = !!token;

    const ADMIN_ROLE = 1;
    const GUEST_ROLE = 2;

    const loginHandler = (token, email, role = GUEST_ROLE) => {
        setToken(token);
        setEmail(email);
        setIsAdmin(role === ADMIN_ROLE);
    }
    const logoutHandler = () => {
        setToken(null);
        setEmail(null);
        setIsAdmin(false);
    }

    const contextValue = {
        token: token,
        email: email,
        isAdmin: isAdmin,
        isLoggedIn: userIsLogin,
        login: loginHandler,
        logout: logoutHandler
    };


    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>

}

export default AuthContext;