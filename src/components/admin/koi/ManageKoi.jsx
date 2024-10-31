import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../koi/ManageKoi.css";
import CreateKoi from "./CreateKoi";
import EditKoi from "./EditKoi";
import Modal from "react-modal";
import ComponentPath from "routes/ComponentPath";
import AdminSideMenu from "../components/AdminSideMenu";

Modal.setAppElement("#root");

export default function ManageKoi() {
  const [kois, setKois] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKoiId, setSelectedKoiId] = useState(null);

  // Hàm tải lại danh sách Koi
  const fetchKois = async () => {
    try {
      const data = await api.get("Kois/");
      if (data.success) {
        setKois(data.kois);
      } else {
        console.log("Không có Koi nào!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchKois();
  }, []);

  // Mở modal xác nhận xóa và lưu lại koiId
  const openDeleteModal = (koiId) => {
    setSelectedKoiId(koiId);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedKoiId(null);
  };

  // Mở modal thêm Koi mới
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Đóng modal thêm Koi mới
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Xác nhận xóa Koi
  const confirmDeleteKoi = async () => {
    try {
      const data = await api.del("Kois/" + selectedKoiId);
      if (data.success) {
        alert("Xóa thành công!");
        setKois((prevKois) =>
          prevKois.filter((koi) => koi.koiId !== selectedKoiId)
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

  // Mở modal cập nhật và lưu lại koiId
  const openEditModal = (koiId) => {
    setSelectedKoiId(koiId);
    setIsEditModalOpen(true);
  };

  // Đóng modal cập nhật
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedKoiId(null);
  };

  return (
    <>
      <div>
        <AdminSideMenu />
        <div className="content-container">
          <h1>Manage Koi</h1>
          <button onClick={openCreateModal} className="add-koi-btn">
            Add Koi
          </button>
          <table className="koi-table">
            <thead>
              <tr>
                <th>KoiId</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {kois.map((koi) => (
                <tr key={koi.koiId}>
                  <td>{koi.koiId}</td>
                  <td>{koi.koiName}</td>
                  <td>{koi.koiTypeName}</td>
                  <td>{koi.price}</td>
                  <td>{koi.weight}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(koi.koiId)}
                    >
                      Delete
                    </button>
                    <button
                      className="update-btn"
                      onClick={() => openEditModal(koi.koiId)}
                    >
                      Update
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
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this Koi?</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmDeleteKoi}>
                Yes
              </button>
              <button className="cancel-btn" onClick={closeDeleteModal}>
                No
              </button>
            </div>
          </Modal>

          {/* Modal thêm mới Koi */}
          <Modal
            isOpen={isCreateModalOpen}
            onRequestClose={closeCreateModal}
            className="modal"
            overlayClassName="overlay"
          >
            <button className="btn-close" onClick={closeCreateModal}>
              X
            </button>
            <CreateKoi onClose={closeCreateModal} onAddSuccess={fetchKois} />
          </Modal>

          {/* Modal cập nhật Koi */}
          {/* Modal cập nhật Koi */}
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            className="modal"
            overlayClassName="overlay"
          >
            <button className="btn-close" onClick={closeEditModal}>
              X
            </button>
            <EditKoi
              koiId={selectedKoiId}
              onClose={closeEditModal}
              onUpdateSuccess={fetchKois}
            />
          </Modal>
        </div>
      </div>
    </>
  );
}
