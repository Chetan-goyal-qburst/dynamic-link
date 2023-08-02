import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { GoogleLogin } from 'react-google-login';
import logo from './Qburst-Logo.png';
import './Navbar.css';

const Navbar = () => {
  const [showDropdowns, setShowDropdowns] = useState(false);

  const toggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };

  const handleMenuItemClick = () => {
    setShowDropdowns(false);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar container">
        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="menu-icon" onClick={toggleDropdowns}>
          <FiMenu />
        </div>
        <ul className={`menu-list ${showDropdowns ? 'show-dropdowns' : ''}`}>
          <li>
            <a href="#home" onClick={handleMenuItemClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleMenuItemClick}>
              About
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleMenuItemClick}>
              Contact
            </a>
          </li>
        </ul>
        <div className="auth-container">
          <GoogleLogin
            clientId="734319102257-p5k74dikmh4h8r342n86k804o464dcr8.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
