import { useEffect, useState } from "react";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../report/ManageTransportationReportDetails.css";
import EditTransportationReportDetails from "./EditTransportationReportDetails";
import Modal from "react-modal";
import AdminSideMenu from "../components/AdminSideMenu";

export default function ManageTransportationReportDetails() {
  const [reports, setReports] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    fetchReports();
  }, [id]);

  const fetchReports = async () => {
    try {
      const data = await api.get("TransportationReportDetails/");
      if (data.success) {
        setReports(data.transportReports);
      } else {
        alert("Không có báo cáo vận chuyển!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };
  // Mở modal xác nhận xóa
  const openDeleteModal = (reportId) => {
    setSelectedReportId(reportId);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedReportId(null);
  };

  // Xác nhận xóa báo cáo
  async function confirmDeleteReport() {
    try {
      api
        .del("TransportationReportDetails/" + selectedReportId)
        .then((data) => {
          if (data.success) {
            alert("Xóa thành công!");
            const newReports = reports.filter(
              (report) => report.transReportDetailId !== selectedReportId
            );
            setReports(newReports);
          } else {
            alert("Xóa thất bại!");
          }
        });
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
    closeDeleteModal();
  }

  // Mở modal cập nhật báo cáo
  const openUpdateModal = (reportId) => {
    setSelectedReportId(reportId);
    setIsUpdateModalOpen(true);
  };

  // Đóng modal cập nhật báo cáo
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedReportId(null);
  };

  return (
    <div>
      <AdminSideMenu />
      <div className="content-container">
        <h1>Manage Transportation Report</h1>
        <table className="report-table">
          <thead>
            <tr>
              <th>ReportId</th>
              <th>OrderId</th>
              <th>Issue ype Name</th>
              <th>Transportation Report Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.transReportDetailId}>
                <td>{report.transReportDetailId}</td>
                <td>{report.orderId}</td>
                <td>{report.issueTypeName}</td>
                <td>{report.transportationReportDate}</td>
                <td>{report.description}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => openDeleteModal(report.transReportDetailId)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openUpdateModal(report.transReportDetailId)}
                    className="change-btn"
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
          <p>Are you sure you want to delete this report?</p>
          <div className="modal-buttons">
            <button onClick={confirmDeleteReport} className="confirm-btn">
              Yes
            </button>
            <button onClick={closeDeleteModal} className="cancel-btn">
              No
            </button>
          </div>
        </Modal>

        {/* Modal cập nhật báo cáo */}
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeUpdateModal}>
            X
          </button>
          {selectedReportId && (
            <EditTransportationReportDetails
              reportId={selectedReportId}
              onClose={closeUpdateModal}
              onUpdateSuccess={fetchReports} // Cập nhật lại bảng khi thành công
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
