import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../api/CallAPI";

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="container">
              <h2>Quản lý báo cáo vận chuyển</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Mã báo cáo</th>
                    <th>Mã đơn hàng</th>
                    <th>Mã loại sự cố</th>
                    <th>Ngày báo cáo</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
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
                          className="btn btn-danger"
                          onClick={() =>
                            deleteReport(report.transReportDetailId)
                          }
                        >
                          Xóa
                        </button>
                        <Link
                          to={{
                            pathname: `/admin/edit-transportation-report/${report.transReportDetailId}`,
                            state: report,
                          }}
                        >
                          Sửa{" "}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
