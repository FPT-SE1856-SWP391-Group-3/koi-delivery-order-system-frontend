import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../user/ManageUser.css";
import Modal from "react-modal";
import ComponentPath from "routes/ComponentPath";
import UpdateUser from "./UpdateUser";
import ManageUserAddress from "../address/ManageUserAddress";

Modal.setAppElement("#root");

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Hàm tải lại danh sách người dùng
  const fetchUsers = async () => {
    try {
      const data = await api.get("Users");
      if (data.success) {
        setUsers(data.users);
      } else {
        alert("Lấy danh sách người dùng thất bại!");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while fetching users. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm mở modal xác nhận xóa
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  // Hàm đóng modal xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  // Hàm xóa người dùng
  const confirmDeleteUser = async () => {
    try {
      const data = await api.del("Users/" + selectedUserId);
      if (data.success) {
        alert("Xóa thành công!");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== selectedUserId)
        );
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user. Please try again.");
    }
    closeDeleteModal();
  };

  // Hàm mở modal cập nhật
  const openUpdateModal = (userId) => {
    setSelectedUserId(userId);
    setIsUpdateModalOpen(true);
  };

  // Hàm đóng modal cập nhật
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUserId(null);
  };

  // Callback khi cập nhật thành công
  const handleUpdateSuccess = () => {
    fetchUsers(); // Tải lại danh sách người dùng
    closeUpdateModal(); // Đóng modal
  };

  // Hàm mở modal địa chỉ
  const openAddressModal = (userId) => {
    setSelectedUserId(userId);
    setIsAddressModalOpen(true);
  };

  // Hàm đóng modal địa chỉ
  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
    setSelectedUserId(null);
  };
  return (
    <>
      <Sidebar />
      <div className="content-container">
        <h1>Manage User</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>UserId</th>
              <th>PhoneNumber</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.userId}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.roleName}</td>
                <td>
                  <button
                    className="btn_delete"
                    onClick={() => openDeleteModal(user.userId)} // Mở modal xác nhận xóa
                  >
                    Delete
                  </button>
                  <button
                    className="btn_update"
                    onClick={() => openUpdateModal(user.userId)} // Mở modal cập nhật
                  >
                    Update
                  </button>
                  <button
                    className="btn_address"
                    onClick={() => openAddressModal(user.userId)} // Mở modal địa chỉ
                  >
                    Address
                  </button>
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
          <h2>Confirm user Deletion</h2>
          <p>Are you sure you want to DELETE this user?</p>
          <div className="confirm-delete-buttons">
            <button className="btn_confirm_yes" onClick={confirmDeleteUser}>
              Yes
            </button>
            <button className="btn_confirm_no" onClick={closeDeleteModal}>
              No
            </button>
          </div>
        </Modal>

        {/* Modal cập nhật người dùng */}
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeUpdateModal}>
            X
          </button>
          <UpdateUser
            userId={selectedUserId}
            onUpdateSuccess={handleUpdateSuccess} // Truyền callback khi cập nhật thành công
          />
        </Modal>

        {/* Modal địa chỉ người dùng */}
        <Modal
          isOpen={isAddressModalOpen}
          onRequestClose={closeAddressModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeAddressModal}>
            X
          </button>
          <ManageUserAddress userId={selectedUserId} /> {/* Truyền userId */}
        </Modal>
      </div>
    </>
  );
}
