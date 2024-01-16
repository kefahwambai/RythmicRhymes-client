import React, { useState } from 'react';
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Settings({ user }) {
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
  const [password, setPassword] = useState('')
  const token = sessionStorage.getItem('jwt');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users/${user.user.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
       
        console.log('User data updated successfully');
      } else {
       
        console.error('Failed to update user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
            
          <label>Username</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            name="name"
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
          />
          <label>Password</label>
          <input
             type="password" 
             value={password}
             onChange={handleEmailChange}
             name="password"
              />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
