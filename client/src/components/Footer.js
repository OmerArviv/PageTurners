import React from "react";
import './Footer.css'

const Footer = () => (
    <div className="footer-wrapper bg-light">
        <ul className="list-inline">
            <li className="list-inline-item"><a href="/">Home</a></li>
            <li className="list-inline-item"><a href="/about">About</a></li>
        </ul>
        <p className="copyright">PageTurners © 2023</p>
    </div>
);

export default Footer;