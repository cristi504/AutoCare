import React from "react";
import "./App.css"; // Import your CSS file

const Header = () => {
  return (
    <header>
      <h1>AutoCare</h1>
      <img src="/static/icon.jpg" alt="AutoCare Icon" className="header-icon" />
      <nav>
        <a href="signup.html">Sign Up</a>
        <a href="login.html">Log In</a>
      </nav>
    </header>
  );
};

export default Header;
