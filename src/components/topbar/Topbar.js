import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import "./topbar.css";

export default function Topbar({handleLogout, user}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
 

  return (
    <div fixed="top"  expand="md" className= "top">
      <div className="topLeft">    
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
      {message && (<Alert severity='success' sx={{ mb:2 }}>{message}</Alert>)}
      {/* {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )} */}
        {user ? (
          <Link className="link" to="/settings">
            <img width="50" height="50" src="https://img.icons8.com/ios/50/user-male-circle--v1.png" alt="user-male-circle--v1"/>
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}        
      </div>
    </div>
  );
}