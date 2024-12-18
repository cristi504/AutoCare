import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <header>
        <h1>AutoCare</h1>
        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
