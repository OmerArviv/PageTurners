import React from "react";
import './Footer.css'
import { Link } from "react-router-dom";
import UserCounter from "./UserCounter";

const Footer = () => (
    <div className="footer-wrapper bg-light">
        <ul className="list-inline">
            <Link className="list-inline-item" to={"/"}>Home</Link>
            <Link className="list-inline-item" to={"/about"}>About</Link>
        </ul>
        <UserCounter />
        <p className="copyright">PageTurners © 2023</p>
    </div>
);

export default Footer;