import React from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <form>
        <h1>Log In</h1>
        <label>Email: <input type="email" /></label>
        <label>Password: <input type="password" /></label>
        <button onClick={() => navigate("/")}>Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
