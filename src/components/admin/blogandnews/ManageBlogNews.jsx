import { useEffect, useState } from "react";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../blogandnews/ManageBlogNews.css";
import Modal from "react-modal";
import EditBlogNews from "./EditBlogNews";
import CreateBlogNews from "./CreateBlogNews";
import AdminSideMenu from "../components/AdminSideMenu";

export default function ManageBlogNews() {
  const [posts, setPosts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.get("BlogNews/");
      if (data.success) {
        setPosts(data.blogNews);
      } else {
        console.log("Không có bài viết!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };

  // Mở popup xác nhận xóa
  const openDeleteModal = (postId) => {
    setSelectedPostId(postId);
    setIsDeleteModalOpen(true);
  };

  // Đóng popup xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPostId(null);
  };

  // Xác nhận xóa bài viết
  const confirmDeletePost = async () => {
    try {
      const data = await api.del("BlogNews/" + selectedPostId);
      if (data.success) {
        alert("Xóa thành công!");
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postId !== selectedPostId)
        );
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
    closeDeleteModal();
  };

  // Mở popup update Blog
  const openEditModal = (postId) => {
    setSelectedPostId(postId);
    setIsEditModalOpen(true);
  };

  // Đóng popup update Blog
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPostId(null);
  };

  // Hiện popup add  Blog
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Đóng popup add  Blog
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <AdminSideMenu />
      <div className="content-container">
        <h1>Blog and News</h1>
        <button onClick={openAddModal} className="add-blog-btn">
          Add Blog/News
        </button>
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
                  <div className="action-buttons">
                    <button
                      onClick={() => openDeleteModal(post.postId)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openEditModal(post.postId)}
                      className="update-btn"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal xác nhận xóa */}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this post?</p>
          <div className="modal-buttons">
            <button onClick={confirmDeletePost} className="confirm-btn">
              Yes
            </button>
            <button onClick={closeDeleteModal} className="cancel-btn">
              No
            </button>
          </div>
        </Modal>

        {/* Modal for Update */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeEditModal}>
            X
          </button>
          {selectedPostId && (
            <EditBlogNews
              postId={selectedPostId}
              onClose={closeEditModal}
              onUpdateSuccess={fetchPosts}
            />
          )}
        </Modal>

        {/* Modal for Add Blog/News */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeAddModal}>
            X
          </button>
          <CreateBlogNews onClose={closeAddModal} onAddSuccess={fetchPosts} />
        </Modal>
      </div>
    </>
  );
}
