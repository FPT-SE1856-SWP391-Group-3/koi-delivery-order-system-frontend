import { useState, useEffect } from "react";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../order/ManageOrder.css";
import Modal from "react-modal";
import ManageOrderDetail from "./ManageOrderDetail";
import CreateTransportationReportDetails from "../report/CreateTransportationReportDetails";
import CreateOrderDocument from "./CreateOrderDocument";

export default function ManageOrder() {
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatusId, setSelectedOrderStatusId] = useState(null);

  const fetchOrders = async () => {
    try {
      // Kiểm tra nếu roleId === 4 thì lấy đơn hàng theo userId
      const endpoint = user.roleId === 4 ? `Orders/${user.userId}` : "Orders/";
      console.log(user.userId);
      const data = await api.get(endpoint);
      if (data.success) {
        setOrder(data.order);
      } else {
        console.log("Không có đơn hàng!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
    api.get("OrderStatus/").then((data) => {
      if (data.success) {
        setOrderStatus(data.orderStatuses);
      } else {
        console.log("Error");
      }
    });
  }, []);

  const updateOrderStatusBySelect = async (event, orderId, currentStatusId) => {
    const selectedStatusId = parseInt(event.target.value);
    if (selectedStatusId <= currentStatusId) {
      alert("Bạn chỉ có thể chọn các trạng thái tiếp theo!");
      return;
    }

    try {
      const updateOrderStatus = { updateOrderStatusId: selectedStatusId };
      api
        .put("Orders/update-status/" + orderId, updateOrderStatus)
        .then((data) => {
          if (data.success) {
            alert("Cập nhật trạng thái thành công!");
            setOrder((orders) =>
              orders.map((order) =>
                order.orderId === orderId
                  ? {
                      ...order,
                      orderStatusId: selectedStatusId,
                      orderStatus: orderStatus.find(
                        (status) => status.orderStatusId === selectedStatusId
                      ),
                    }
                  : order
              )
            );
          } else {
            alert("Cập nhật trạng thái thất bại!");
          }
        });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  const updateOrderStatusByClick = async (orderId, currentStatusId) => {
    const currentStatusIndex = orderStatus.findIndex(
      (status) => status.orderStatusId === currentStatusId
    );

    if (
      currentStatusIndex === -1 ||
      currentStatusIndex === orderStatus.length - 1
    ) {
      alert("Đơn hàng đã hoàn thành hoặc không tìm thấy trạng thái hiện tại!");
      return;
    }

    const nextStatusId = orderStatus[currentStatusIndex + 1].orderStatusId;
    const updateOrderStatus = { updateOrderStatusId: nextStatusId };

    try {
      const response = await api.put(
        `Orders/update-status/${orderId}`,
        updateOrderStatus
      );
      if (response.success) {
        alert("Cập nhật trạng thái thành công!");
        setOrder((orders) =>
          orders.map((order) =>
            order.orderId === orderId
              ? {
                  ...order,
                  orderStatusId: nextStatusId,
                  orderStatus: orderStatus[currentStatusIndex + 1],
                }
              : order
          )
        );
      } else {
        alert("Cập nhật trạng thái thất bại!");
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  // Mở modal chi tiết đơn hàng
  const openDetailModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsDetailModalOpen(true);
  };

  // Đóng modal chi tiết đơn hàng
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrderId(null);
  };

  // Mở modal tạo tài liệu đơn hàng
  const openDocumentModal = (orderId, orderStatusId) => {
    setSelectedOrderId(orderId);
    setSelectedOrderStatusId(orderStatusId);
    setIsDocumentModalOpen(true);
  };

  // Đóng modal tài liệu đơn hàng
  const closeDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderStatusId(null);
  };

  // Mở modal báo cáo vận chuyển
  const openReportModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsReportModalOpen(true);
  };

  // Đóng modal báo cáo vận chuyển
  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div>
      <Sidebar />
      <div className="manage-container">
        <h1>Manage Order</h1>
        <table className="order-table">
          <thead>
            <tr>
              <th>OrderID</th>
              <th>CustomerID</th>
              <th>Order date</th>
              <th>Delivery date</th>
              <th>Pick up address</th>
              <th>Shipping address</th>
              <th>Distance</th>
              <th>Delivery time</th>
              <th>Total amount</th>
              <th>Status</th>
              <th>Edit Status</th>
              <th>Detail</th>
              <th>Order Document</th>
              <th>Transportation Report</th>
              <th>Delivering Staff</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerId}</td>
                <td>{order.orderDate}</td>
                <td>{order.deliveryDate}</td>
                <td>{order.startAddress?.addressLine || ""}</td>
                <td>{order.endAddress?.addressLine || ""}</td>
                <td>{order.distance}</td>
                <td>{order.duration}</td>
                <td>{order.totalPrice}</td>
                <td>{order.orderStatus.orderStatusName}</td>
                <td>
                  {user.roleId === 5 ? (
                    <select
                      className="update-status-select"
                      onChange={(event) => {
                        updateOrderStatusBySelect(
                          event,
                          order.orderId,
                          order.orderStatusId
                        );
                      }}
                    >
                      {orderStatus
                        .filter(
                          (status) =>
                            status.orderStatusId >= order.orderStatusId
                        )
                        .map((status) => (
                          <option
                            key={status.orderStatusId}
                            value={status.orderStatusId}
                            selected={
                              status.orderStatusId === order.orderStatusId
                            }
                          >
                            {status.orderStatusName}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <button
                      className="update-status-btn"
                      onClick={() =>
                        updateOrderStatusByClick(
                          order.orderId,
                          order.orderStatusId
                        )
                      }
                    >
                      {order.orderStatus.orderStatusName}
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => openDetailModal(order.orderId)}
                    className="detail-btn"
                  >
                    Detail
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      openDocumentModal(order.orderId, order.orderStatusId)
                    }
                    className="createdocument-btn"
                  >
                    Add Document
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => openReportModal(order.orderId)}
                    className="createtransportation-btn"
                  >
                    Transportation Report
                  </button>
                </td>
                <td>{order.deliveryStaffId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal chi tiết đơn hàng */}
        <Modal
          isOpen={isDetailModalOpen}
          onRequestClose={closeDetailModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeDetailModal}>
            X
          </button>
          {selectedOrderId && <ManageOrderDetail orderId={selectedOrderId} />}
        </Modal>

        {/* Modal tạo tài liệu đơn hàng */}
        <Modal
          isOpen={isDocumentModalOpen}
          onRequestClose={closeDocumentModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeDocumentModal}>
            X
          </button>
          {selectedOrderId && selectedOrderStatusId && (
            <CreateOrderDocument
              orderId={selectedOrderId}
              orderStatusId={selectedOrderStatusId}
              onClose={closeDocumentModal}
              onAddSuccess={fetchOrders} // Cập nhật danh sách sau khi thêm tài liệu thành công
            />
          )}
        </Modal>

        {/* Modal tạo báo cáo vận chuyển */}
        <Modal
          isOpen={isReportModalOpen}
          onRequestClose={closeReportModal}
          className="modal"
          overlayClassName="overlay"
        >
          <button className="btn-close" onClick={closeReportModal}>
            X
          </button>
          {selectedOrderId && (
            <CreateTransportationReportDetails
              orderId={selectedOrderId}
              onClose={closeReportModal}
              onAddSuccess={fetchOrders} // Cập nhật danh sách sau khi thêm báo cáo thành công
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
