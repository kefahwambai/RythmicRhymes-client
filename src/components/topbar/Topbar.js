import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./topbar.css";

export default function Topbar({user, setUser}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  const topBar = document.querySelector('.top');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop) {
      
      topBar.classList.remove('blur');
    } else {
     
      topBar.classList.add('blur');
    }

    lastScrollTop = currentScrollTop;
  });



  function handleLogout() {
    fetch('http://localhost:3000/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
     }).then((r) => {
        if (r.ok) {
        localStorage.removeItem('user');
        setUser(null);
        setMessage('User Logged Out!');
        setTimeout(() => {
          navigate('/');
      }, 1234);        
        }
      });
    }

  
  

  return (
    <div expanded={expand}  fixed="top"  expand="md" className={navColour ? "sticky" : "top"}>
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