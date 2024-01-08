import "./register.css"
import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';


export default function Register({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); 
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const [message, setMessage] = useState('')
 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setSignupError('Password and confirmation do not match.');
      return;
    }

    const formData = {      
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
    
      
    };
    
    
    const response = fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "accept": "application/json"        
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((user) => {    
        // console.log(user)    
        if (user) {     
          setUser(user)                    
          setMessage('Account Created');
          setTimeout(() => {
            navigate('/');
          }, 1234);
        } else {
          setSignupError(user.error);
        }
      })
      .catch((error) => {
        setSignupError('Signup failed');
        console.error(error);
      });
  };


    return (
        <div className="register">        
      <span className="registerTitle">Register</span>
      {message && (<Alert severity='success' sx={{ mb:2 }}>{message}</Alert>)}
            {signupError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {signupError}
              </Alert>
            )}
      <form className="registerForm">
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." id="name"  label="Username" name="name" autoComplete="name" value={name} required onChange={(e) => setName(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." value={email} required onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." name="password" label="Password" id="password" autoComplete="new-password" value={password} required onChange={(e) => setPassword(e.target.value)} />
        <label>Password Confirmation</label>
        <input className="registerInput" type="password" name="passwordConfirmation" placeholder="Confirm your password..."label="Confirm Password" id="passwordConfirmation" autoComplete="new-password-confirmation" value={passwordConfirmation} required onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <button className="registerButton" onClick={handleSubmit}>Register</button>
      </form>
      <button className="loginRegisterButton" ><Link to="/login">Login</Link></button>
    </div>
    )
}