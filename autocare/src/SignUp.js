import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <form>
        <h1>Sign Up</h1>
        <label>Email: <input type="email" /></label>
        <label>Password: <input type="password" /></label>
        <label>Confirm Password: <input type="password" /></label>
        <button onClick={() => navigate("/")}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
