import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../report/ManageTransportationReportDetails.css";

export default function ManageTransportationReportDetails() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    try {
      api.get("TransportationReportDetails/").then((data) => {
        if (data.success) {
          setReports(data.transportReports);
          console.log(data.transportReports);
        } else {
          alert("Không có báo cáo vận chuyển!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [id]);

  async function deleteReport(reportId) {
    try {
      api.del("TransportationReportDetails/" + reportId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newReports = reports.filter(
            (report) => report.transReportDetailId !== reportId
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
  }

  return (
    <div>
      <Sidebar />
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
                    onClick={() => deleteReport(report.transReportDetailId)}
                  >
                    Delete
                  </button>
                  <Link
                    to={{
                      pathname: `/admin/edit-transportation-report/${report.transReportDetailId}`,
                      state: report,
                    }}
                    className="change-btn"
                  >
                    Update{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
