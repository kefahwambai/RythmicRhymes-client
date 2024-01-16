import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./singlepost.css";
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function SinglePost({ user }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = sessionStorage.getItem('jwt');
  const [message, setMessage] = useState('');
  const isUserOwner = user && post && user.user.id === post.user?.id;


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const postData = await response.json();
        // console.log('Post Data:', postData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage('Post Deleted!')
        
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>In the Realm of Rhymes...</p>
        <i className="loading-icon fas fa-hourglass-half"></i>
      </div>
    );
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="singlePost">
      {message && (<Alert severity='success' sx={{ mb:2 }}>{message}</Alert>)}
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={post.image} alt="" />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            {isUserOwner && (
              <>
               
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </>
            )}
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
