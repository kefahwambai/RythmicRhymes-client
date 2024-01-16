import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./singlepost.css";
import { useParams } from "react-router-dom";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const postData = await response.json();
        console.log('Post Data:', postData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={post.image} alt="" />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?username=${post.user.name}`}>
                {post.user.name}
              </Link>
            </b>
          </span>
          <span>{post.date}</span>
        </div>
        <p className="singlePostDesc">{post.description}</p>
      </div>
    </div>
  );
}
