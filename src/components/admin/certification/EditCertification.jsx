import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api/CallAPI"
import "../certification/EditCertification.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function EditCertification() {
    const [certification, setCertification] = useState({
        certificationName: "",
        certificateFile: null,
    })
    const { certificationId } = useParams() // Lấy certificationId từ URL params
    const navigate = useNavigate()
    console.log(certificationId)
    console.log(certification)

    useEffect(() => {
        // Gọi API để lấy thông tin Certification dựa trên certificationId
        const fetchCertification = async () => {
            try {
                api.get("Certifications/" + certificationId).then((data) => {
                    if (data.success) {
                        console.log(data.certification)
                        setCertification({
                            certificationName:
                                data.certification.certificationName,
                            certificateFile: null, // File không thể set từ dữ liệu API
                        }) // Set giá trị vào state
                    } else {
                        UserToast("error", "Không tìm thấy Certification!")
                    }
                })
            } catch (error) {
                console.error("Error fetching Certification:", error)
                UserToast(
                    "error",
                    "An error occurred while fetching the Certification."
                )
            }
        }

        fetchCertification()
    }, [certificationId])

    // Cập nhật Certification
    const handleSubmit = async (e) => {
        e.preventDefault() // Ngăn chặn reload trang
        console.log(certification)
        const certificationData = new FormData()
        certificationData.set(
            "certificationName",
            certification.certificationName
        )
        certificationData.set("certificateFile", certification.certificateFile)

        try {
            api.putForm(
                "Certifications/" + certificationId,
                certificationData
            ).then((data) => {
                if (data.success) {
                    UserToast("success", "Update certification successfully!")
                    navigate("/admin/manage-certification")
                } else {
                    UserToast("error", "Failed to update certification!")
                }
            })
        } catch (error) {
            console.error("Error during update:", error)
            UserToast(
                "error",
                "An error occurred during update. Please try again."
            )
        }
    }

    return (
        <>
            <ToastContainer />
            <a className="back-button" href="/admin/manage-certification">
                Back
            </a>
            <div className="updatecertificate-container">
                <h2 className="form-title">Update Certification</h2>
                <form
                    onSubmit={handleSubmit}
                    className="updatecertificate-form"
                >
                    <div className="form-group">
                        <label htmlFor="certificationName">
                            Certificate Name
                        </label>
                        <input
                            type="text"
                            id="certificationName"
                            name="certificationName"
                            value={certification.certificationName}
                            onChange={(e) =>
                                setCertification({
                                    ...certification,
                                    certificationName: e.target.value,
                                })
                            } // Xử lý sự kiện thay đổi
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="certificateFile">
                            Certificate File
                        </label>
                        <input
                            type="file"
                            id="certificateFile"
                            name="certificateFile"
                            onChange={(e) =>
                                setCertification({
                                    ...certification,
                                    certificateFile: e.target.files[0],
                                })
                            }
                        />
                    </div>
                    <button type="submit" className="btn-update">
                        UPDATE
                    </button>
                </form>
            </div>
        </>
    )
}
