import { useEffect, useState } from "react";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../faq/ManageFaq.css";
import Modal from "react-modal";
import NewFaq from "./NewFaq";
import UpdateFaq from "./UpdateFaq";
import AdminSideMenu from "../components/AdminSideMenu";

Modal.setAppElement("#root");

export default function ManageFaq() {
  const [faqs, setFaqs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState(null);

  // Hàm tải lại danh sách FAQs
  const fetchFaqs = async () => {
    try {
      const data = await api.get("Faqs/");
      if (data.success) {
        setFaqs(data.faqs);
      } else {
        console.log("Không có địa chỉ!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Xác nhận xóa FAQ
  const confirmDeleteFaq = async () => {
    try {
      const data = await api.del("Faqs/" + selectedFaqId);
      if (data.success) {
        alert("Xóa thành công!");
        setFaqs((prevFaqs) =>
          prevFaqs.filter((faq) => faq.faqid !== selectedFaqId)
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

  // Mở modal xác nhận xóa và lưu lại faqId cần xóa
  const openDeleteModal = (faqId) => {
    setSelectedFaqId(faqId);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedFaqId(null);
  };

  // Mở modal thêm FAQ
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Đóng modal thêm FAQ
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Mở modal cập nhật FAQ
  const openUpdateModal = (faqId) => {
    setSelectedFaqId(faqId);
    setIsUpdateModalOpen(true);
  };

  // Đóng modal cập nhật FAQ
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedFaqId(null);
  };

  return (
    <div>
      <AdminSideMenu />
      <div className="content-container">
        <h1>Manage FAQs</h1>
        <button onClick={openAddModal} className="add-fag-btn">
          Add FAQ
        </button>
        <table className="fag-table">
          <thead>
            <th>FAQId</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Action</th>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.faqid}>
                <td>{faq.faqid}</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <button
                    onClick={() => openDeleteModal(faq.faqid)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openUpdateModal(faq.faqid)}
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
          <p>Are you sure you want to delete this FAQ?</p>
          <div className="modal-buttons">
            <button className="confirm-btn" onClick={confirmDeleteFaq}>
              Yes
            </button>
            <button className="cancel-btn" onClick={closeDeleteModal}>
              No
            </button>
          </div>
        </Modal>

        {/* Modal thêm mới FAQ */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeAddModal}>
            X
          </button>
          <NewFaq onClose={closeAddModal} onAddSuccess={fetchFaqs} />
        </Modal>

        {/* Modal cập nhật FAQ */}
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeUpdateModal}>
            X
          </button>
          <UpdateFaq
            faqId={selectedFaqId}
            onClose={closeUpdateModal}
            onUpdateSuccess={fetchFaqs}
          />
        </Modal>
      </div>
    </div>
  );
}
