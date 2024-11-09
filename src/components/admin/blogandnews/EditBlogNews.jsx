import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import api from "../../../api/CallAPI";
import "../blogandnews/EditBlogNews.css";

export default function EditBlogNews({ postId, onClose, onUpdateSuccess }) {
  const [blogNews, setBlogNews] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    const fetchBlogNews = async () => {
      try {
        if (!postId) return;
        api.get("BlogNews/" + postId).then((data) => {
          if (data.success) {
            setBlogNews(data.blogNews);
          } else {
            alert("Không tìm thấy BlogNews!");
          }
        });
      } catch (error) {
        console.error("Error fetching BlogNews:", error);
        alert("An error occurred while fetching the BlogNews.");
      }
    };

    fetchBlogNews();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      api.put("BlogNews/" + postId, blogNews).then((data) => {
        if (data.success) {
          alert("Cập nhật thành công!");
          onClose(); // Đóng modal
          onUpdateSuccess(); // Cập nhật danh sách
        } else {
          alert("Cập nhật thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  return (
    <div className="updateblog-container">
      <form onSubmit={handleSubmit} className="updateblog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogNews.title}
            onChange={(e) =>
              setBlogNews({ ...blogNews, title: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="subtitle">Subtitle</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={blogNews.subtitle}
            onChange={(e) =>
              setBlogNews({ ...blogNews, subtitle: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            type="url"
            id="thumbnail"
            name="thumbnail"
            pattern="https?://.+"
            placeholder="https://example.com/image.jpg"
            value={blogNews.thumbnail}
            onChange={(e) =>
              setBlogNews({ ...blogNews, thumbnail: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <MDEditor
            id="content"
            name="content"
            value={blogNews.content}
            onChange={(value) =>
              setBlogNews({ ...blogNews, content: value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={blogNews.category}
            onChange={(e) =>
              setBlogNews({ ...blogNews, category: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn-update">
          UPDATE
        </button>
      </form>
    </div>
  );
}
