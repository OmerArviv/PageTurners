import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from "./LoginButton/LoginButton";
import './Header.css';
import AuthContext from "../store/auth-context";
import LogoutButton from "./LogoutButton/LogoutButton";
import { Link } from "react-router-dom";

const Header = () => {
    const authCtx = useContext(AuthContext);
    const isLogged = authCtx.isLoggedIn;
    const isAdmin = authCtx.isAdmin;

    return (
        <Navbar bg="light">
            <Container>
                <Link to={"/"} className="navbar-link">
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="/LogoWithoutNameWithoutBack.png"
                            width="25"
                            height="27"
                            className="d-inline-block align-top font-logo"
                        />{' '}
                        PageTurners
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/about'>About</Nav.Link>
                        <Nav.Link as={Link} to='/usedBooks'>Used Books</Nav.Link>
                        {isAdmin &&
                            <Nav.Link as={Link} to='/admin'>Admin</Nav.Link>
                        }

                    </Nav >
                    <Nav>
                        {
                            isLogged
                                ? <LogoutButton />
                                : <Link to={`/login`}><LoginButton /></Link>
                        }
                    </Nav>
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default Header;