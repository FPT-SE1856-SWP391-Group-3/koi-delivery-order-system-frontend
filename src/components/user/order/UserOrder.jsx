import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import AddDocument from "../document/AddDocument";
import CreateFeedback from "../feedback/CreateFeedback";
import UserOrderDetail from "./UserOrderDetail";
import Box from "@mui/material/Box";
import UserSideNav from "../UserSideNav";
import {
  Button,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Grid } from "@mui/joy"; 


export default function UserOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    api.get("Orders/" + userId).then((data) => {
      if (data.success) {
        setOrders(data.orders);
        console.log(data.orders);
      } else {
        console.log("Không có đơn hàng!");
      }
    });
  }, [userId]);

  const handleShowDetailModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDetailModal(true);
  };

  const handleShowFeedbackModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowFeedbackModal(true);
  };

  const handleShowDocumentModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDocumentModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setShowFeedbackModal(false);
    setShowDocumentModal(false);
  };

  return (
    <Box>
      <UserSideNav>
        <Box sx={{ marginInline: "1em" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Danh sách đơn hàng
              </Typography>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã đơn hàng</TableCell>
                      <TableCell>Ngày đặt hàng</TableCell>
                      <TableCell>Ngày giao hàng</TableCell>
                      <TableCell>Địa chỉ lấy hàng</TableCell>
                      <TableCell>Địa chỉ giao hàng</TableCell>
                      <TableCell>Tổng tiền</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Chi tiết</TableCell>
                      <TableCell>FeedBack</TableCell>
                      <TableCell>Document</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders &&
                      orders.map((order) => (
                        <TableRow key={order.orderId}>
                          <TableCell>{order.orderId}</TableCell>
                          <TableCell>{order.orderDate}</TableCell>
                          <TableCell>{order.deliveryDate}</TableCell>
                          <TableCell>
                            {order.startAddress == null
                              ? ""
                              : order.startAddress.addressLine}
                          </TableCell>
                          <TableCell>
                            {order.endAddress == null
                              ? ""
                              : order.endAddress.addressLine}
                          </TableCell>
                          <TableCell>{order.totalPrice}</TableCell>
                          <TableCell>
                            {order.orderStatus == null
                              ? ""
                              : order.orderStatus.orderStatusName}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleShowDetailModal(order.orderId)
                              }
                            >
                              Chi tiết
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleShowFeedbackModal(order.orderId)
                              }
                            >
                              Feedback
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleShowDocumentModal(order.orderId)
                              }
                            >
                              Document
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>

        {/* Detail Modal */}
        <Modal
          open={showDetailModal}
          onClose={handleCloseModal}
          aria-labelledby="detail-modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <Typography id="detail-modal-title" variant="h6" component="h2">
              Chi tiết đơn hàng
            </Typography>
            <UserOrderDetail orderId={selectedOrderId} />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseModal}
              >
                Đóng
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Feedback Modal */}
        <Modal
          open={showFeedbackModal}
          onClose={handleCloseModal}
          aria-labelledby="feedback-modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <Typography id="feedback-modal-title" variant="h6" component="h2">
              Thêm Feedback
            </Typography>
            <CreateFeedback orderId={selectedOrderId} />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseModal}
              >
                Đóng
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Document Modal */}
        <Modal
          open={showDocumentModal}
          onClose={handleCloseModal}
          aria-labelledby="document-modal-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <Typography id="document-modal-title" variant="h6" component="h2">
              Thêm Document
            </Typography>
            <AddDocument orderId={selectedOrderId} userId={userId} />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseModal}
              >
                Đóng
              </Button>
            </Box>
          </Box>
        </Modal>
      </UserSideNav>
    </Box>
  );
}
