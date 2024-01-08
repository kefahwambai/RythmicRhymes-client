import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Post from "../../components/post/Post";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";

export default function Homepage() {

  return (
    <>
      <Header />
      <div className="home">
        <Post />
        <Sidebar />
      </div>
    </>
  );
}