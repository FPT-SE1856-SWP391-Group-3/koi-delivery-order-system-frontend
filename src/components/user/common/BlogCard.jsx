import React, { useEffect, useState } from "react";
import "../css/BlogCard.css";
import CallAPI from "../../../api/CallAPI";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Markdown from "react-markdown";

const BlogCard = ({ chunkSize = 4, firstChunk = false }) => {
  const [chunkedPosts, setChunkedPosts] = useState([[]]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await CallAPI.get("BlogNews/");
      if (data.success) {
        const chunkedPosts = [];
        for (let i = 0; i < data.blogNews.length; i += chunkSize) {
          chunkedPosts.push(data.blogNews.slice(i, i + chunkSize));
        }
        setChunkedPosts(chunkedPosts);
      } else {
        console.log("No posts found!");
      }
    } catch (error) {
      console.error("Error occurred while fetching posts:", error);
    }
  };

  return chunkedPosts
    .filter((_, k) => (firstChunk ? k === 0 : true))
    .map((posts, index) => (
      <div className="blog-container" key={index}>
        <div
          className="main-card"
          key={posts[0]?.postId}
          onClick={() => handlePostClick(posts[0])}
        >
          <img src={posts[0]?.thumbnail} alt="Main Blog Image" className="main-img" />
          <div className="main-content">
            <div className="main-text">
              <h2>{posts[0]?.title}</h2>
              <p>{posts[0]?.subtitle}</p>
            </div>
          </div>
        </div>
        <div className="side-cards">
          {posts
            .filter((_, k) => k != 0)
            .map((post) => (
              <div
                className="side-card"
                key={post.postId}
                onClick={() => handlePostClick(post)}
              >
                <img src={post.thumbnail} alt="Side Blog Image" className="side-img" />
                <div className="side-content">
                  <h3>
                    <i className="icon"></i>
                    {post.title}
                  </h3>
                  <p>{post.subtitle}</p>
                </div>
              </div>
            ))}
        </div>
        {isDialogOpen && (
          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            maxWidth="lg"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {selectedPost.title}
            </DialogTitle>
            <DialogContent>
              <Markdown>{selectedPost.content}</Markdown>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    ));

  /*return (
    <div className="blog-container">
      <div className="main-card">
        <img src={blog1} alt="Main Blog Image" className="main-img" />
        <div className="main-content">
          <div className="main-text">
            <h3>
              <i className="icon"></i> Lorem ipsum dolor sit amet consectetur.
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Senectus quam ipsum semper
              mollis nulla eget. Quam in duis consectetur accumsan.
            </p>
          </div>
          <a href="#" className="arrow-link">
            <i className="arrow-icon"></i>
          </a>
        </div>
      </div>

      <div className="side-cards">
        <div className="side-card">
          <img src={blog2} alt="Side Blog Image" className="side-img" />
          <div className="side-content">
            <h4>
              <i className="icon"></i> Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Senectus quam ipsum semper
              mollis nulla eget.
            </p>
            <a href="#" className="arrow-link">
              <i className="arrow-icon"></i>
            </a>
          </div>
        </div>

        <div className="side-card">
          <img src={blog3} alt="Side Blog Image" className="side-img" />
          <div className="side-content">
            <h4>
              <i className="icon"></i> Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Senectus quam ipsum semper
              mollis nulla eget.
            </p>
            <a href="#" className="arrow-link">
              <i className="arrow-icon"></i>
            </a>
          </div>
        </div>

        <div className="side-card">
          <img src={blog4} alt="Side Blog Image" className="side-img" />
          <div className="side-content">
            <h4>
              <i className="icon"></i> Lorem ipsum dolor sit amet consectetur.
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Senectus quam ipsum semper
              mollis nulla eget.
            </p>
            <a href="#" className="arrow-link">
              <i className="arrow-icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );*/
};

export default BlogCard;
