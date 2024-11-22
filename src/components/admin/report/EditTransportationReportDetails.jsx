import { useEffect, useState } from "react"
import api from "../../../api/CallAPI"
import "../report/EditTransportationReportDetails.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function EditTransportationReportDetails({
    reportId,
    onClose,
    onUpdateSuccess,
}) {
    const [updateReport, setUpdateReport] = useState({
        issueTypeId: "",
        description: "",
    })

    useEffect(() => {
        // Gọi API để lấy thông tin báo cáo dựa trên reportId
        const fetchReport = async () => {
            try {
                const data = await api.get(
                    "transportation-report-details/" + reportId
                )
                if (data.success) {
                    setUpdateReport(data.transportationReportDetail)
                } else {
                    UserToast("error", "No report found.")
                }
            } catch (error) {
                console.error("Error fetching report:", error)
                UserToast(
                    "error",
                    "An error occurred while fetching the report."
                )
            }
        }

        fetchReport()
    }, [reportId])

    // Cập nhật báo cáo
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await api.put(
                "transportation-report-details/" + reportId,
                updateReport
            )
            if (data.success) {
                UserToast("success", "Update report successfully!")
                onUpdateSuccess() // Gọi callback để tải lại dữ liệu
                onClose() // Đóng modal sau khi cập nhật
            } else {
                UserToast("error", "Failed to update report!")
            }
        } catch (error) {
            console.error("Error during update:", error)
            UserToast(
                "error",
                "An error occurred during update. Please try again."
            )
        }
    }

    return (
        <div className="updatereport-container">
            <ToastContainer />
            <h2 className="form-title">Update Transportation Report</h2>
            <form onSubmit={handleSubmit} className="updatereport-form">
                <div className="form-group">
                    <label htmlFor="issueTypeId">Issue Type</label>
                    <input
                        type="text"
                        id="issueTypeId"
                        name="issueTypeId"
                        value={updateReport.issueTypeId}
                        onChange={(e) =>
                            setUpdateReport({
                                ...updateReport,
                                issueTypeId: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={updateReport.description}
                        onChange={(e) =>
                            setUpdateReport({
                                ...updateReport,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
                <button type="submit" className="btn-update">
                    UPDATE
                </button>
            </form>
        </div>
    )
}
