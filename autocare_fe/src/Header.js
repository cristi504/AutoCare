import React from "react";
import { Link } from "react-router-dom";
import "./App.css"; 

const Header = () => {
  return (
    <header>
      <h1>AutoCare</h1>
      <img src="/static/icon.jpg" alt="AutoCare Icon" className="header-icon" />
      <nav>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </nav>
    </header>
  );
};

export default Header;
