import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";

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
      <h1>Certifications</h1>
      <a href="/admin/create-certification">Add Certification</a>
      <table>
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
                >
                  Delete
                </button>
                <a
                  href={
                    "/admin/edit-certification/" + certification.certificationId
                  }
                >
                  Update
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
