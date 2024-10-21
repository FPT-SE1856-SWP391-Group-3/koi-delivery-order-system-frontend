import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import ComponentPath from "routes/ComponentPath";
export default function ManageBlogNews() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      api.get("BlogNews/").then((data) => {
        if (data.success) {
          setPosts(data.blogNews);
          console.log(data.blogNews);
        } else {
          console.log("Không có bài viết!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, []);

  async function deletePost(postId) {
    try {
      api.del("BlogNews/" + postId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newPosts = posts.filter((post) => post.postId !== postId);
          setPosts(newPosts);
        } else {
          alert("Xóa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
  }

  return (
    <div>
      <h1>Blog and News</h1>
       <a href={ComponentPath.admin.blogNews.createBlogNews}>Add Post</a>
      {posts.map((post) => (
        <div key={post.postId}>
          <h3>PostId: {post.postId}</h3>
          <h3>UserId: {post.userId}</h3>
          <h3>Title: {post.title}</h3>
          <h3>Content: {post.content}</h3>
          <h3>PostDate: {post.postDate}</h3>
          <h3>Category: {post.category}</h3>
          <button onClick={() => deletePost(post.postId)}>Delete</button>
          <a href={ComponentPath.admin.blogNews.editBlogNews + post.postId}>Update</a>
        </div>
      ))}
    </div>
  );
}
