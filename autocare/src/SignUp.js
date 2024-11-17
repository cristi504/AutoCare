import React from "react";

const SignUp = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>Email: <input type="email" /></label>
        <label>Password: <input type="password" /></label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
