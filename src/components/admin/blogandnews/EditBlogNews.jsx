import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";

export default function EditBlogNews() {
    const [blogNews, setBlogNews] = useState({
        title: "",
        content: "",
        category: "",
    });
    const { postId } = useParams(); // Lấy blogNewsId từ URL params
    const navigate = useNavigate();
    console.log(postId);
    console.log(blogNews);

    useEffect(() => {
        // Gọi API để lấy thông tin BlogNews dựa trên blogNewsId
        const fetchBlogNews = async () => {
            try {
                api.get("BlogNews/" + postId).then((data) => {
                  if (data.success) {
                    console.log(data.blogNews);
                    setBlogNews(data.blogNews); // Set giá trị vào state
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

    // Cập nhật BlogNews
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        try {
            api.put("BlogNews/" + postId, blogNews)
                .then((data) => {
                    if (data.success) {
                        alert("Cập nhật thành công!");
                        navigate("/admin/manage-blog-news");
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
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center">Cập nhật BlogNews</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Tiêu đề</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={blogNews.title}
                                    onChange={(e) =>
                                        setBlogNews({ ...blogNews, title: e.target.value })
                                    } // Xử lý sự kiện thay đổi
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Nội dung</label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    name="content"
                                    value={blogNews.content}
                                    onChange={(e) =>
                                        setBlogNews({ ...blogNews, content: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Danh mục</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    value={blogNews.category}
                                    onChange={(e) =>
                                        setBlogNews({ ...blogNews, category: e.target.value })
                                    }
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Cập nhật
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
