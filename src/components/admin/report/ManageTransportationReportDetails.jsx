import { useEffect, useState } from "react";
import api from "../../../api/CallAPI";
import EditTransportationReportDetails from "./EditTransportationReportDetails";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Modal from "react-modal";
import AdminSideMenu from "../components/AdminSideMenu";

export default function ManageTransportationReportDetails() {
  const [reports, setReports] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    fetchReports();
  }, [id]);

  const fetchReports = async () => {
    try {
      const data = await api.get("TransportationReportDetails/");
      if (data.success) {
        setReports(data.transportReports);
      } else {
        alert("Không có báo cáo vận chuyển!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };
  // Mở modal xác nhận xóa
  const openDeleteModal = (reportId) => {
    setSelectedReportId(reportId);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedReportId(null);
  };

  // Xác nhận xóa báo cáo
  async function confirmDeleteReport() {
    try {
      api
        .del("TransportationReportDetails/" + selectedReportId)
        .then((data) => {
          if (data.success) {
            alert("Xóa thành công!");
            const newReports = reports.filter(
              (report) => report.transReportDetailId !== selectedReportId
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
    closeDeleteModal();
  }

  // Mở modal cập nhật báo cáo
  const openUpdateModal = (reportId) => {
    setSelectedReportId(reportId);
    setIsUpdateModalOpen(true);
  };

  // Đóng modal cập nhật báo cáo
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedReportId(null);
  };

  return (
    <Box display="flex">
      <AdminSideMenu />
      <Box flex={1} padding={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Transportation Report Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell fontWeight={600} align="center">
                  ReportId
                </TableCell>
                <TableCell fontWeight={600} align="center">
                  OrderId
                </TableCell>
                <TableCell fontWeight={600} align="center">
                  Issue ype Name
                </TableCell>
                <TableCell fontWeight={600} align="center">
                  Transportation Report Date
                </TableCell>
                <TableCell fontWeight={600} align="center">
                  Description
                </TableCell>
                <TableCell fontWeight={600} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.transReportDetailId}>
                  <TableCell align="center">
                    {report.transReportDetailId}
                  </TableCell>
                  <TableCell align="center">{report.orderId}</TableCell>
                  <TableCell align="center">{report.issueTypeName}</TableCell>
                  <TableCell align="center">
                    {report.transportationReportDate}
                  </TableCell>
                  <TableCell align="center">{report.description}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        openDeleteModal(report.transReportDetailId)
                      }
                      sx={{ marginRight: 1 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        openUpdateModal(report.transReportDetailId)
                      }
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Modal xác nhận xóa */}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this report?</p>
          <div className="modal-buttons">
            <button onClick={confirmDeleteReport} className="confirm-btn">
              Yes
            </button>
            <button onClick={closeDeleteModal} className="cancel-btn">
              No
            </button>
          </div>
        </Modal>

        {/* Modal cập nhật báo cáo */}
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeUpdateModal}>
            X
          </button>
          {selectedReportId && (
            <EditTransportationReportDetails
              reportId={selectedReportId}
              onClose={closeUpdateModal}
              onUpdateSuccess={fetchReports} // Cập nhật lại bảng khi thành công
            />
          )}
        </Modal>
      </Box>
    </Box>
  );
}
