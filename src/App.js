import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Post from "./components/post/Post";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import SinglePost from "./components/singlepost/Singlepost";
import Write from "./pages/write/Write";
import Footer from "./components/footer/Footer";

function App() {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
 

  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwt');

    if (storedToken) {
      const [, payloadBase64] = storedToken.split('.');
      try {
        const decodedPayload = atob(payloadBase64);
        const parsedPayload = JSON.parse(decodedPayload);

        const expirationTime = parsedPayload.exp * 1000; 
        const currentTime = new Date().getTime();

        if (currentTime > expirationTime) {
          setUser(null);
          sessionStorage.removeItem('jwt');
          navigate('/login');
        } else {
          setUser(parsedPayload);
        }
      } catch (error) {
        console.error('Error parsing token payload:', error);
      }
    } else {
      console.log('User not found');
    }
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        console.error("No JWT token found in local storage.");
        return;
      }
      sessionStorage.removeItem("jwt");
      setUser(null);   
      navigate("/");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="loading-container">
  //       <p>In the Realm of Rhymes...</p>
  //       <i className="loading-icon fas fa-hourglass-half"></i>
  //     </div>
  //   );
  // }

  
  

  return (
    <div>
      <Topbar user={user} setUser={setUser} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Post />} />
        {user ? (
          <>
            <Route path="/write" element={<Write user={user} setUser={setUser}  />} />
            <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </>
        )}
        <Route path="/posts/:id" element={<SinglePost postId={id} user={user} setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
