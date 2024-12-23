import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState('');
  const[password,setPassword] =useState('');
  const[error,setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) =>{
    e.preventDefault();
    setError('');

    try{
        const response = await fetch('http://localhost:5000/login',{
          method :'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email,password}),
        });

        const data=  await response.json();
        if(response.ok)
        {
          localStorage.setItem('user_id' , data.user_id);
          navigate('/main');
        }
        else{
          setError(data.error || 'Sign In Failed');
          alert(error)
        }
    }
    catch (err){
        setError('Error connecting to server');
    }
  };
  return (
    <div>
      <form onSubmit={handleSignIn}>
        <h1>Log In</h1>
        <label>Email: <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Password: <input type="password" placeholder="Password " value={password} onChange={(e)=>setPassword(e.target.value)} required /></label>
        <button type="submit" >Log In</button>
      </form>
      <p style={styles.p}>
        Don't have an account?{' '}
        <Link to="/signup" style={styles.link}>Sign up here</Link>
     </p>
    </div>
  );
};
const styles = {
  p: {
      textAlign: 'center', // Correct property name
      color: 'white', // Optional additional styles
      
  },
  link :{
    color :'#00d0c7'
  },
};

export default LogIn;
