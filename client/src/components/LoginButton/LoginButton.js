import React, { Component } from "react";
import Button from 'react-bootstrap/Button'

class LoginButton extends Component {
    render() {
        return (
            <div>
                <Button variant="secondary">Login</Button>
            </div>
        );
    }
}

export default LoginButton;