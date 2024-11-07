import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../../../api/CallAPI";
import AddOrderServiceDetail from "./AddOrderServiceDetail";
import EditOrderServiceDetail from "./EditOrderServiceDetail";
import Modal from "react-modal";
import AdminSideMenu from "../components/AdminSideMenu";

export default function ManageOrderServiceDetail() {
  const [orderServiceDetails, setOrderServiceDetails] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrderServiceId, setSelectedOrderServiceId] = useState(null);

  // Hàm tải lại danh sách Order Service Detail
  const fetchOrderServiceDetails = async () => {
    try {
      const data = await api.get("OrderServiceDetails/");
      if (data.success) {
        setOrderServiceDetails(data.orderServiceDetails);
      } else {
        console.log("Không có dữ liệu!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrderServiceDetails();
  }, []);

  // Mở modal xác nhận xóa và lưu lại orderServiceDetailId
  const openDeleteModal = (orderServiceDetailId) => {
    setSelectedOrderServiceId(orderServiceDetailId);
    setIsDeleteModalOpen(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedOrderServiceId(null);
  };

  // Xác nhận xóa Order Service Detail
  const confirmDeleteOrderService = async () => {
    try {
      const response = await fetch(
        "OrderServices/deleteOrderServiceDetail/" + selectedOrderServiceId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Xóa thành công!");
        const newOrderServiceDetails = orderServiceDetails.filter(
          (orderServiceDetail) =>
            orderServiceDetail.orderServiceDetailId !== selectedOrderServiceId
        );
        setOrderServiceDetails(newOrderServiceDetails);
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
    closeDeleteModal();
  };

  // Mở modal thêm Order Service Detail
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Đóng modal thêm Order Service Detail
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Mở modal cập nhật Order Service Detail
  const openEditModal = (orderServiceDetailId) => {
    setSelectedOrderServiceId(orderServiceDetailId);
    setIsEditModalOpen(true);
  };

  // Đóng modal cập nhật Order Service Detail
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedOrderServiceId(null);
  };
  return (
    <Box display="flex">
      <AdminSideMenu />
      <Box flex={1} padding={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Manage Order Services
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="faq table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    OrderServiceId
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Price
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderServiceDetails.map((orderServiceDetail) => (
                <TableRow key={orderServiceDetail.orderServiceDetailId}>
                  <TableCell align="center">
                    {orderServiceDetail.orderServiceDetailId}
                  </TableCell>
                  <TableCell align="center">
                    {orderServiceDetail.orderServiceDetailName}
                  </TableCell>
                  <TableCell align="center">
                    {orderServiceDetail.orderServiceDetailPrice}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        openDeleteModal(orderServiceDetail.orderServiceDetailId)
                      }
                      sx={{ marginRight: 1 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        openEditModal(orderServiceDetail.orderServiceDetailId)
                      }
                      className="update-btn"
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Floating Action Button for Adding FAQ */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={openAddModal}
        >
          <AddIcon />
        </Fab>

        {/* Modal xác nhận xóa */}
        <Dialog
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          overlayClassName="overlay"
        >
          <DialogTitle align="center">Confirm Deletion</DialogTitle>
          <DialogContentText>
            Are you sure you want to <strong>Delete</strong> this Order Service
            Detail?
          </DialogContentText>
          <DialogActions
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
          >
            <Button onClick={confirmDeleteOrderService} color="error">
              Yes
            </Button>
            <Button onClick={closeDeleteModal} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal thêm mới Order Service Detail */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          className="modal"
          overlayClassName="overlay"
        >
          <AddOrderServiceDetail
            onClose={closeAddModal}
            onAddSuccess={fetchOrderServiceDetails}
          />
        </Modal>
        {/* Modal cập nhật Order Service Detail */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeEditModal}>
            X
          </button>
          <EditOrderServiceDetail
            id={selectedOrderServiceId}
            onClose={closeEditModal}
            onUpdateSuccess={fetchOrderServiceDetails}
          />
        </Modal>
      </Box>
    </Box>
  );
}
