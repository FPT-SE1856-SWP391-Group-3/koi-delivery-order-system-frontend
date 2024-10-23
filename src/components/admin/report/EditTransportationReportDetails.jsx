import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import "../report/EditTransportationReportDetails.css";

export default function EditTransportationReportDetails() {
  const [updateReport, setUpdateReport] = useState({
    issueTypeId: "",
    description: "",
  });
  const { reportId } = useParams(); // Lấy reportId từ URL params
  const navigate = useNavigate();
  console.log(reportId);

  useEffect(() => {
    // Gọi API để lấy thông tin báo cáo dựa trên reportId
    const fetchReport = async () => {
      try {
        api.get("TransportationReportDetails/" + reportId).then((data) => {
          if (data.success) {
            console.log(data.transportationReportDetail);
            setUpdateReport(data.transportationReportDetail); // Set giá trị vào state
          } else {
            alert("Không tìm thấy báo cáo!");
          }
        });
      } catch (error) {
        console.error("Error fetching report:", error);
        alert("An error occurred while fetching the report.");
      }
    };

    fetchReport();
  }, [reportId]);

  // Cập nhật báo cáo
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
      api
        .put("TransportationReportDetails/" + reportId, updateReport)
        .then((data) => {
          if (data.success) {
            alert("Cập nhật thành công!");
            navigate("/admin/manage-transportation-report");
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
    <>
      <a className="back-button" href="/admin/manage-blog-news">
        Back
      </a>
      <div className="updatereport-container">
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
              } // Xử lý sự kiện thay đổi
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
    </>
  );
}
