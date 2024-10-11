import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";

export default function EditCertification() {
    const [certification, setCertification] = useState({
        certificationName: "",
        certificateFile: null,
    });
    const { certificationId } = useParams(); // Lấy certificationId từ URL params
    const navigate = useNavigate();
    console.log(certificationId);
    console.log(certification);


    useEffect(() => {
        // Gọi API để lấy thông tin Certification dựa trên certificationId
        const fetchCertification = async () => {
            try {
                api.get("Certifications/" + certificationId).then((data) => {
                  if (data.success) {
                    console.log(data.certification);
                    setCertification({
                        certificationName: data.certification.certificationName,
                        certificateFile: null, // File không thể set từ dữ liệu API
                    }); // Set giá trị vào state
                  } else {
                    alert("Không tìm thấy Certification!");
                  }
                });
            } catch (error) {
                console.error("Error fetching Certification:", error);
                alert("An error occurred while fetching the Certification.");
            }
        };

        fetchCertification();
    }, [certificationId]);

    // Cập nhật Certification
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        console.log(certification);
        const certificationData = new FormData();
        certificationData.set('certificationName', certification.certificationName);
        certificationData.set('certificateFile', certification.certificateFile);

        try {
            api.putForm("Certifications/" + certificationId, certificationData).then((data) => {
                if (data.success) {
                    alert("Cập nhật thành công!");
                    navigate("/admin/manage-certification");
                } else {
                    alert("Cập nhật thất bại!");
                }
            });
        } catch (error) {
            console.error("Error during update:", error);
            alert("An error occurred during update. Please try again.");
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center">Cập nhật Certification</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="certificationName">Tên chứng chỉ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="certificationName"
                                    name="certificationName"
                                    value={certification.certificationName}
                                    onChange={(e) =>
                                        setCertification({ ...certification, certificationName: e.target.value })
                                    } // Xử lý sự kiện thay đổi
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="certificateFile">Tệp chứng chỉ</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="certificateFile"
                                    name="certificateFile"
                                    onChange={(e) =>
                                        setCertification({ ...certification, certificateFile: e.target.files[0] })
                                    }
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Cập nhật
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
