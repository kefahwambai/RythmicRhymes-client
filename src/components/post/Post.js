import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "./post.css";

export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      });
  }, []);


  return (
    <Container fluid className="post-section">
      <Container>
        <Row style={{ justifyContent: "center" }}>
          {posts.map((post) => (
            <Col md={5} className="post-card" key={post.id}>
              <div className="post-card-views" key={post.id}>
                <div className="post-card">
                  <img src={post.image} className="postImg" alt={post.title} />
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
              </div>
            </Col>
          ))}
        </Row>
      </Container>
     
    </Container>
  );
}
