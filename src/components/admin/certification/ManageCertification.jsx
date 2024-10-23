import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../certification/ManageCertification.css";
import ComponentPath from "routes/ComponentPath";


export default function ManageCertification() {
  const [certifications, setCertifications] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      api.get("Certifications/").then((data) => {
        if (data.success) {
          setCertifications(data.certifications);
          console.log(data.certifications);
        } else {
          console.log("Không có chung chi!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, []);

  async function deleteCertification(certificationId) {
    try {
      api.del("Certifications/" + certificationId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newCertifications = certifications.filter(
            (certification) => certification.certificationId !== certificationId
          );
          setCertifications(newCertifications);
        } else {
          alert("Xóa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
  }

  return (
    <div>
      <Sidebar />
      <div className="content-container">
        <h1>Manage Certifications</h1>
        <a href={ComponentPath.admin.certification.createCertification} className="add-certificate-btn">
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
                      deleteCertification(certification.certificationId)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <a
                    href={ComponentPath.admin.certification.editCertification + certification.certificationId}
                    className="update-btn"
                  >
                    Update
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
