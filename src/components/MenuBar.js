import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import logo from './Qburst-Logo.png';
import '../App.css';

const MenuBar = () => {
  const [showDropdowns, setShowDropdowns] = useState(false);

  const toggleDropdowns = () => {
    setShowDropdowns(!showDropdowns);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="menu-icon" onClick={toggleDropdowns}>
          <FiMenu />
        </div>
        <ul className={`menu-list ${showDropdowns ? 'show-dropdowns' : ''}`}>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default MenuBar;
