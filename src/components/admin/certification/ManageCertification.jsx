import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";

export default function ManageCertification() {
    const [certifications, setCertifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api.get('Certifications/')
                .then(data => {
                    if (data.success) {
                        setCertifications(data.certifications);
                        console.log(data.certifications);
                    } else {
                        console.log('Không có chung chi!');
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
                const newCertifications = certifications.filter((certification) => certification.certificationId !== certificationId);
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
            <Header />
            <h1>Certifications</h1>
            <a href="/admin/create-certification">Add Certification</a>
            {certifications.map((certification) => (
                <div key={certification.certificationId}>
                    <h3>CertificationId: {certification.certificationId}</h3>
                    <h3>CertificationName: {certification.certificationName}</h3>
                    <h3>CertificateFile: {certification.certificateFile}</h3>
                    <button onClick={() => deleteCertification(certification.certificationId)}>Delete</button>
                    <a href={"/admin/update-certification/" + certification.certificationId}>Update</a>
                </div>
            ))}
        </div>
    );
}
