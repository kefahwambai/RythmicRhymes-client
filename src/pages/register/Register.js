import "./register.css"
import { useState } from "react"


export default function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); 
  const [signupError, setSignupError] = useState('');

  const [message, setMessage] = useState('')
 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setSignupError('Password and confirmation do not match.');
      return;
    }

    const formData = {
      user: {
        username: username,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
    
      },
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
        localStorage.setItem('token', response.headers.get("Authorization"))
        if (user) {          
                    
          setMessage('Account Created');
          // setTimeout(() => {
          //   navigate('/homepage');
          // }, 1234);
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
      <form className="registerForm">
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." id="name"  label="Username" name="name" autoComplete="name" value={username} required onChange={(e) => setUserName(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" type="password" name="password" label="Password" id="password" autoComplete="new-password" value={password} required onChange={(e) => setPassword(e.target.value)} />
        <label>Password Confirmation</label>
        <input className="registerInput" type="password" name="passwordConfirmation" label="Confirm Password" id="passwordConfirmation" autoComplete="new-password-confirmation" value={passwordConfirmation} required onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <button className="registerButton" onClick={handleSubmit}>Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
    </div>
    )
}