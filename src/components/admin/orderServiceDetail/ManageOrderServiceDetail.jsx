import { useState, useEffect } from "react";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../orderServiceDetail/OrderServiceDetail.css";
import AddOrderServiceDetail from "./AddOrderServiceDetail";
import EditOrderServiceDetail from "./EditOrderServiceDetail";
import Modal from "react-modal";
import ComponentPath from "routes/ComponentPath";

Modal.setAppElement("#root");

export default function ManageOrderServiceDetail() {
  const [orderServiceDetails, setOrderServiceDetails] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrderServiceId, setSelectedOrderServiceId] = useState(null);

  // Hàm tải lại danh sách Order Service Detail
  const fetchOrderServiceDetails = async () => {
    try {
      const data = await api.get("OrderServiceDetails/");
      if (data.success) {
        setOrderServiceDetails(data.orderServiceDetails);
      } else {
        console.log("Không có dữ liệu!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrderServiceDetails();
  }, []);

  // Mở modal xác nhận xóa và lưu lại orderServiceDetailId
  const openDeleteModal = (orderServiceDetailId) => {
    setSelectedOrderServiceId(orderServiceDetailId);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedOrderServiceId(null);
  };

  // Xác nhận xóa Order Service Detail
  const confirmDeleteOrderService = async () => {
    try {
      const response = await fetch(
        "OrderServices/deleteOrderServiceDetail/" + selectedOrderServiceId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Xóa thành công!");
        const newOrderServiceDetails = orderServiceDetails.filter(
          (orderServiceDetail) =>
            orderServiceDetail.orderServiceDetailId !== selectedOrderServiceId
        );
        setOrderServiceDetails(newOrderServiceDetails);
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
    closeDeleteModal();
  };

  // Mở modal thêm Order Service Detail
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Đóng modal thêm Order Service Detail
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Mở modal cập nhật Order Service Detail
  const openEditModal = (orderServiceDetailId) => {
    setSelectedOrderServiceId(orderServiceDetailId);
    setIsEditModalOpen(true);
  };

  // Đóng modal cập nhật Order Service Detail
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedOrderServiceId(null);
  };
  return (
    <div>
      <Sidebar />
      <div className="content-container">
        <h1>Manage Order Services</h1>
        <button onClick={openAddModal} className="add-service-btn">
          Add Order Service
        </button>
        <table className="orderservice-table">
          <thead>
            <tr>
              <th>OrderServiceId</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderServiceDetails.map((orderServiceDetail) => (
              <tr key={orderServiceDetail.orderServiceDetailId}>
                <td>{orderServiceDetail.orderServiceDetailId}</td>
                <td>{orderServiceDetail.orderServiceDetailName}</td>
                <td>{orderServiceDetail.orderServiceDetailPrice}</td>
                <td>
                  <button
                    onClick={() =>
                      openDeleteModal(orderServiceDetail.orderServiceDetailId)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      openEditModal(orderServiceDetail.orderServiceDetailId)
                    }
                    className="update-btn"
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
          <p>Are you sure you want to delete this Order Service Detail?</p>
          <div className="modal-buttons">
            <button className="confirm-btn" onClick={confirmDeleteOrderService}>
              Yes
            </button>
            <button className="cancel-btn" onClick={closeDeleteModal}>
              No
            </button>
          </div>
        </Modal>
        {/* Modal thêm mới Order Service Detail */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeAddModal}>
            X
          </button>
          <AddOrderServiceDetail
            onClose={closeAddModal}
            onAddSuccess={fetchOrderServiceDetails}
          />
        </Modal>
        {/* Modal cập nhật Order Service Detail */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeEditModal}>
            X
          </button>
          <EditOrderServiceDetail
            id={selectedOrderServiceId}
            onClose={closeEditModal}
            onUpdateSuccess={fetchOrderServiceDetails}
          />
        </Modal>
      </div>
    </div>
  );
}
