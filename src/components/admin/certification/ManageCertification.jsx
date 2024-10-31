import { useEffect, useState } from "react";
import api from "../../../api/CallAPI";

import "../certification/ManageCertification.css";
import Modal from "react-modal";
import ComponentPath from "routes/ComponentPath";
import AdminSideMenu from "../components/AdminSideMenu";

export default function ManageCertification() {
  const [certifications, setCertifications] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCertificationId, setSelectedCertificationId] = useState(null);

  useEffect(() => {
    try {
      api.get("Certifications/").then((data) => {
        if (data.success) {
          setCertifications(data.certifications);
        } else {
          console.log("Không có chứng chỉ!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, []);

  // Mở modal xác nhận xóa
  const openDeleteModal = (certificationId) => {
    setSelectedCertificationId(certificationId);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCertificationId(null);
  };

  // Xóa chứng chỉ khi người dùng xác nhận
  async function confirmDeleteCertification() {
    try {
      const data = await api.del("Certifications/" + selectedCertificationId);
      if (data.success) {
        alert("Xóa thành công!");
        setCertifications((prevCertifications) =>
          prevCertifications.filter(
            (certification) =>
              certification.certificationId !== selectedCertificationId
          )
        );
        closeDeleteModal();
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
      closeDeleteModal();
    }
  }

  return (
    <div>
      <AdminSideMenu />
      <div className="content-container">
        <h1>Manage Certifications</h1>
        <a
          href={ComponentPath.admin.certification.createCertification}
          className="add-certificate-btn"
        >
          Add Certification
        </a>
        <table className="certificate-table">
          <thead>
            <tr>
              <th>CertificationId</th>
              <th>CertificationName</th>
              <th>CertificateFile</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map((certification) => (
              <tr key={certification.certificationId}>
                <td>{certification.certificationId}</td>
                <td>{certification.certificationName}</td>
                <td>{certification.certificateFile}</td>
                <td>
                  <img
                    src={api.imageBuildUrl(certification.certificateFile)}
                    width="100px"
                    alt="Certificate"
                  />
                </td>
                <td>
                  <button
                    onClick={() =>
                      openDeleteModal(certification.certificationId)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <a
                    href={
                      ComponentPath.admin.certification.editCertification +
                      certification.certificationId
                    }
                    className="update-btn"
                  >
                    Update
                  </a>
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
          <p>Are you sure you want to delete this certification?</p>
          <div className="modal-buttons">
            <button
              className="confirm-btn"
              onClick={confirmDeleteCertification}
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
