import React from "react";

const LogIn = () => {
  return (
    <div>
      <h2>Log In</h2>
      <form>
        <label>Email: <input type="email" /></label>
        <label>Password: <input type="password" /></label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
