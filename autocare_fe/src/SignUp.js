import React ,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import './signup.css';

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
          navigate('/login');}
          else {
            setError(data.error || 'Sign-up failed.');  
            alert(error)
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
      <p style={styles.p}>  
        Already have an account?{' '}
       <Link to="/login" style={styles.link}>Sign in here</Link>
      </p>
    </div>
  );
};
const styles = {
  p:{
    textAlign: 'center',
    color : 'white',
    fontSize: '20px'
  },
  link :{
    color :'#00d0c7'
  },
};
export default SignUp; 
