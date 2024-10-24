import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useEffect } from "react";
import ComponentPath from "routes/ComponentPath";
import Bootstrap from "../props/Bootstrap";
import Modal from "react-bootstrap/Modal";
import UserSidebar from "../common/UserSidebar";
import Header from "../common/Header";
import AddDocument from "../document/AddDocument";
import CreateFeedback from "../feedback/CreateFeedback";
import UserOrderDetail from "./UserOrderDetail";

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
    <div>
      <Bootstrap />
      <UserSidebar />
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
                        show={showDetailModal}
                        onHide={handleCloseModal}
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <UserOrderDetail orderId={selectedOrderId} />
                        </Modal.Body>
                      </Modal>

                      {/* Modal Feedback */}
                      <Modal
                        show={showFeedbackModal}
                        onHide={handleCloseModal}
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Thêm Feedback</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <CreateFeedback orderId={selectedOrderId} />
                        </Modal.Body>
                      </Modal>

                      {/* Modal Document */}
                      <Modal
                        show={showDocumentModal}
                        onHide={handleCloseModal}
                        size="lg"
                        scrollable={true}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Thêm Document</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <AddDocument orderId={selectedOrderId} userId={userId} />
                        </Modal.Body>
                      </Modal>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
