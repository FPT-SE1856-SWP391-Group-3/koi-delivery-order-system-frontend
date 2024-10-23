import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../blogandnews/ManageBlogNews.css";

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
    <>
      <Sidebar />
      <div className="content-container">
        <h1>Blog and News</h1>
        <a href="/admin/create-blog-news" className="add-blog-btn">
          Add Post
        </a>
        <table className="blog-table">
          <thead>
            <tr>
              <th>PostId</th>
              <th>UserId</th>
              <th>Title</th>
              <th>Content</th>
              <th>PostDate</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <td>{post.postId}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.postDate}</td>
                <td>{post.category}</td>
                <td>
                  <button
                    onClick={() => deletePost(post.postId)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <a
                    href={"/admin/edit-blog-news/" + post.postId}
                    className="update-btn"
                  >
                    Update
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
