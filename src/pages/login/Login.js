import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./login.css";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = {
      user: {
        email: email,
        password: password,
      },
    };
  
    const response = fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: "Bearer" + localStorage.getItem("token")
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          // Successful response
          return res.json();
        } else {
          // Handle the error response here and set the error message
          throw new Error('Login failed. Please check your credentials.');
        }
      })
      .then((user) => {

      })
      .catch((error) => {
        // setLoginError(error.message); // Set error message here
        console.log('Error:', error);
      });
  }
  
     
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." value={email} required onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." value={password} required onChange={(e) => setPassword(e.target.value)}/>
        <button className="loginButton" onClick={handleSubmit}>Login</button>
      </form>
        <button className="loginRegisterButton"><Link>Register</Link></button>
    </div>
  );
}