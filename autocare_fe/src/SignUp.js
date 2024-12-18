import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
 
  const[email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    setError('');
    try{
        const response =await fetch('http://localhost:5000/signup',{
          method :'POST',
          headers : {'Content-Type' : 'application/json'},
          body: JSON.stringify({email,password}),
        });
        const data  = await response.json();
        if (response.ok) {
          alert('Sign-up successful. Please sign in.');
          navigate('/signin');}
          else {
            setError(data.error || 'Sign-up failed.');  
        }
    }
    catch(err){
      setError('Error connecting to server.');
    }
  }
  return (
    <div>
      <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <label>Email: <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}required /> </label>
        <label>Password: <input  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/> </label>
        <button type="submit" >Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp; 
