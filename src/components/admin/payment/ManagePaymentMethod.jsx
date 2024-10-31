import { useState, useEffect } from "react";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../payment/ManagePaymentMethod.css";
import AddPaymentType from "./AddPaymentMethod";
import EditPaymentType from "./EditPaymentMethod";
import Modal from "react-modal";
import AdminSideMenu from "../components/AdminSideMenu";

Modal.setAppElement("#root");

export default function ManagePaymentMethod() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);

  // Hàm tải danh sách Payment Methods
  const fetchPaymentMethods = async () => {
    try {
      const data = await api.get("PaymentMethods/");
      if (data.success) {
        setPaymentMethods(data.paymentMethods);
      } else {
        console.log("Không có phương thức thanh toán!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  // Mở modal xác nhận xóa
  const openDeleteModal = (paymentMethodId) => {
    setSelectedPaymentMethodId(paymentMethodId);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPaymentMethodId(null);
  };

  // Xác nhận xóa Payment Method
  const confirmDeletePaymentMethod = async () => {
    try {
      const data = await api.del("PaymentMethods/" + selectedPaymentMethodId);
      if (data.success) {
        alert("Xóa thành công!");
        const newPaymentMethods = paymentMethods.filter(
          (paymentMethod) =>
            paymentMethod.paymentMethodId !== selectedPaymentMethodId
        );
        setPaymentMethods(newPaymentMethods);
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
    closeDeleteModal();
  };
  // Mở modal thêm Payment Method
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Đóng modal thêm Payment Method
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Mở modal cập nhật Payment Method
  const openEditModal = (paymentMethodId) => {
    setSelectedPaymentMethodId(paymentMethodId);
    setIsEditModalOpen(true);
  };

  // Đóng modal cập nhật Payment Method
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPaymentMethodId(null);
  };

  return (
    <div>
      <AdminSideMenu />
      <div className="content-container">
        <h1>Payment Methods</h1>
        <button onClick={openAddModal} className="add-payment-btn">
          Add Payment Method
        </button>
        <table className="payment-table">
          <thead>
            <th>PaymentMethodId</th>
            <th>Name</th>
            <th>Action</th>
          </thead>
          <tbody>
            {paymentMethods.map((paymentType) => (
              <tr key={paymentType.paymentMethodId}>
                <td>{paymentType.paymentMethodId}</td>
                <td>{paymentType.paymentMethodName}</td>
                <td>
                  <button
                    onClick={() => openDeleteModal(paymentType.paymentMethodId)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openEditModal(paymentType.paymentMethodId)}
                    className="update-btn"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal thêm mới Payment Method */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeAddModal}>
            X
          </button>
          <AddPaymentType
            onClose={closeAddModal}
            onAddSuccess={fetchPaymentMethods}
          />
        </Modal>

        {/* Modal cập nhật Payment Method */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeEditModal}>
            X
          </button>
          <EditPaymentType
            id={selectedPaymentMethodId}
            onClose={closeEditModal}
            onUpdateSuccess={fetchPaymentMethods}
          />
        </Modal>

        {/* Modal xác nhận xóa */}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this payment method?</p>
          <div className="modal-buttons">
            <button
              className="confirm-btn"
              onClick={confirmDeletePaymentMethod}
            >
              Yes
            </button>
            <button className="cancel-btn" onClick={closeDeleteModal}>
              No
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
