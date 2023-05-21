import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/header.css'

function Header() {
    return (
        <div className="header">
            <h1 className="logo-name">GenderMe</h1>
            <div className="header-links">
                <a className="header-link" href="/about">About</a>
                <a className="header-link" href="/team">Team</a>
                <a className="header-link" href="/contact">Contact</a>
            </div>
        </div>
    );
}

export default Header;