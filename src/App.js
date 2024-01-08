import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Post from "./components/post/Post";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Footer from "./components/footer/Footer";

function App() {
  const storedUser = localStorage.getItem('user');
  console.log(storedUser)
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState(initialUser);

  return (
    <div>
      <Topbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Post />} />
        {user ? (
          <>
            <Route path="/write" element={<Write user={user} />} />
            <Route path="/settings" element={<Settings setUser={setUser} />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </>
        )}
        <Route path="/post/:id" element={<Single />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
