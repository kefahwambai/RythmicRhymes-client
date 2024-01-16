import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import "./login.css";


export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 
  const [password, setPassword] = useState('');  
  const [message, setMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const userData = await response.json();    
        // console.log(userData)   
        const token = userData.token;  
        // console.log("Set Token", token)       
        sessionStorage.setItem('jwt', token);
        // const decodedToken = jwtDecode(token)
        // console.log(decodedToken)
        setUser(userData);  
        setEmail("")
        setPassword('')
        setMessage('Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 1234);
      } else {
        const errorData = await response.json();
        setLoginError(errorData.error);
      }
    } catch (error) {
      setLoginError('Login failed');
      console.error(error);
    }
  };
  
  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      {message && (<Alert severity='success' sx={{ mb:2 }}>{message}</Alert>)}
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}
      <form className="loginForm">
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." value={email} required onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." value={password} required onChange={(e) => setPassword(e.target.value)}/>
        <button className="loginButton" onClick={handleSubmit}>Login</button>
      </form>
      <button className="loginRegisterButton" ><Link to="/register">Register</Link></button>
    </div>
  );
}