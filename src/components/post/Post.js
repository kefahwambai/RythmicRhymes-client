import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./post.css";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching posts..."); 
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((fetchedPosts) => {
        console.log("Posts fetched:", fetchedPosts);
        setPosts(fetchedPosts);
        setLoading(false);
      });
  }, []); 

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <img className="postImg" src={post.image} alt="" />
          <div className="postInfo">
            <span className="postTitle">
              <Link to={`/posts/${post.id}`} className="link">
                {post.title}
              </Link>
            </span>
            <hr />
            <span className="postDate">{post.datetime}</span>
          </div>
          <p className="postDesc">{post.description}</p>
        </div>
      ))}
    </div>
  );
}
