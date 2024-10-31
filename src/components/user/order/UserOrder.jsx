import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useEffect } from "react";
import Bootstrap from "../props/Bootstrap";
import AddDocument from "../document/AddDocument";
import CreateFeedback from "../feedback/CreateFeedback";
import UserOrderDetail from "./UserOrderDetail";
import Box from '@mui/material/Box';
import UserSideNav from "../user-mui/UserSideNav";
import { Button, Modal } from "@mui/material";
import { ModalFooter } from "react-bootstrap";

export default function UserOrder() {
  const navigate = useNavigate();
  const [order, setOrder] = useState([{}]);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    api.get("Orders/" + userId).then((data) => {
      if (data.success) {
        setOrder(data.order);
        console.log(data.order);
      } else {
        console.log("Không có đơn hàng!");
      }
    });
  }, [userId]);

  //-----------------Modal-----------------
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
  //--------------------------------------

  return (
    <Box sx={{ display: "flex" }}>
      <UserSideNav>
      <Bootstrap />
      <div className="content">
        <div className="row">
        <div className="col-md-12">
          <h2 className="text-center">Danh sách đơn hàng</h2>
          <table className="table">
          <thead>
            <tr>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Ngày đặt hàng</th>
            <th scope="col">Ngày giao hàng</th>
            <th scope="col">Địa chỉ lấy hàng</th>
            <th scope="col">Địa chỉ giao hàng</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Chi tiết</th>
            <th scope="col">FeedBack</th>
            <th scope="col">Document</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.orderDate}</td>
              <td>{order.deliveryDate}</td>
              <td>
              {order.startAddress == null
                ? ""
                : order.startAddress.addressLine}
              </td>
              <td>
              {order.endAddress == null
                ? ""
                : order.endAddress.addressLine}
              </td>
              <td>{order.totalPrice}</td>
              <td>
              {order.orderStatus == null
                ? ""
                : order.orderStatus.orderStatusName}
              </td>
              <td>
              <button
                className="btn btn-primary"
                onClick={() => handleShowDetailModal(order.orderId)}
              >
                Chi tiết
              </button>
              </td>
              <td>
              <button
                className="btn btn-primary"
                onClick={() => handleShowFeedbackModal(order.orderId)}
              >
                Feedback
              </button>
              </td>
              <td>
              <button
                className="btn btn-primary"
                onClick={() => handleShowDocumentModal(order.orderId)}
              >
                Document
              </button>
              </td>
              <div>
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
                <h2 id="detail-modal-title">Chi tiết đơn hàng</h2>
                <UserOrderDetail orderId={selectedOrderId} />
                <ModalFooter>
                  <Button variant="contained" color="error" onClick={handleCloseModal}>
                  Đóng
                  </Button>
                </ModalFooter>
                </Box>
              </Modal>

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
                <h2 id="feedback-modal-title">Thêm Feedback</h2>
                <CreateFeedback orderId={selectedOrderId} />
                <ModalFooter>
                  <Button variant="contained" color="error" onClick={handleCloseModal}>
                  Đóng
                  </Button>
                </ModalFooter>
                </Box>
              </Modal>

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
                <h2 id="document-modal-title">Thêm Document</h2>
                <AddDocument
                  orderId={selectedOrderId}
                  userId={userId}
                />
                <ModalFooter>
                  <Button variant="contained" color="error" onClick={handleCloseModal}>
                  Đóng
                  </Button>
                </ModalFooter>
                </Box>
              </Modal>
              </div>
            </tr>
            ))}
          </tbody>
          </table>
        </div>
        </div>
      </div>
      </UserSideNav>
    </Box>
    );
}
