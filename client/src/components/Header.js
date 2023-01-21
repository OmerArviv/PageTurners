import React, {useContext} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from "./LoginButton/LoginButton";
import './Header.css';
import AuthContext from "../store/auth-context";
import LogoutButton from "./LogoutButton/LogoutButton";

const Header = () => {
    const authCtx = useContext(AuthContext);
    const isLogged = authCtx.isLoggedIn;

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/LogoWithoutNameWithoutBack.png"
                        width="25"
                        height="27"
                        className="d-inline-block align-top font-logo"
                    />{' '}
                    PageTurners
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#catalog">Catalog</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            isLogged
                                ? <LogoutButton/>
                                : <LoginButton/>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;