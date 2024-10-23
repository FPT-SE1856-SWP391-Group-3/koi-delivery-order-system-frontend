import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { set } from "react-hook-form";
import Sidebar from "../../user/common/Sidebar";
import "../order/ManageOrder.css";

export default function ManageOrder() {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    api.get("Orders/").then((data) => {
      if (data.success) {
        setOrder(data.order);
        console.log(data.order);
      } else {
        console.log("Không có đơn hàng!");
      }
    });
    api.get("OrderStatus/").then((data) => {
      if (data.success) {
        setOrderStatus(data.orderStatuses);
        console.log(data.orderStatuses);
      } else {
        console.log("Error");
      }
    });
  }, []);

  const updateOrderStatusBySelect = async (event, orderId) => {
    console.log(orderId);
    var updateOrderStatus = {
      updateOrderStatusId: parseInt(event.target.value),
    };
    console.log(updateOrderStatus);
    try {
      api
        .put("Orders/update-status/" + orderId, updateOrderStatus)
        .then((data) => {
          if (data.success) {
            alert("Cập nhật trạng thái thành công!");
          } else {
            alert("Cập nhật trạng thái thất bại!");
          }
        });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  const updateOrderStatusByClick = async (event, orderId, orderStatusId) => {
    console.log(orderId);
    if (orderStatusId < 6) {
      var updateOrderStatus = {
        updateOrderStatusId: orderStatusId + 1,
      };
    } else {
      alert("Đơn hàng đã hoàn thành!");
    }
    console.log(updateOrderStatus);
    try {
      api
        .put("Orders/update-status/" + orderId, updateOrderStatus)
        .then((data) => {
          if (data.success) {
            alert("Cập nhật trạng thái thành công!");
            setOrder((order) =>
              order.map((order) => {
                if (order.orderId === orderId) {
                  return {
                    ...order,
                    orderStatusId: updateOrderStatus.updateOrderStatusId,
                    orderStatus: orderStatus.find(
                      (orderStatus) =>
                        orderStatus.orderStatusId ===
                        updateOrderStatus.updateOrderStatusId
                    ),
                  };
                } else {
                  return order;
                }
              })
            );
          } else if (data.success === false) {
            alert(
              "Hãy thêm tài liệu cho đơn hàng trước khi chuyển trạng thái!"
            );
          }
        });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  console.log(user.roleId);

  return (
    <div>
      <Sidebar />
      <div className="content-container">
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
              <th>Detail</th>
              <th>Edit Status</th>
              <th>Transportation Report</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order) => {
              var data = (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.customerId}</td>
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
                  <td>{order.distance}</td>
                  <td>{order.duration}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.orderStatus.orderStatusName}</td>
                  <td>
                    <button
                      className="detail-btn"
                      onClick={() =>
                        navigate("/admin/manage-order-detail/" + order.orderId)
                      }
                    >
                      Details
                    </button>
                  </td>
                  <td>
                    {user.roleId === 5 ? (
                      <select
                        className="update-status-select"
                        onChange={(event) => {
                          updateOrderStatusBySelect(event, order.orderId);
                        }}
                      >
                        {orderStatus.map((orderStatus) => (
                          <option
                            key={orderStatus.orderStatusId}
                            value={orderStatus.orderStatusId}
                            selected={
                              orderStatus.orderStatusId === order.orderStatusId
                            }
                          >
                            {orderStatus.orderStatusName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        className="update-status-btn"
                        onClick={(event) =>
                          updateOrderStatusByClick(
                            event,
                            order.orderId,
                            order.orderStatusId
                          )
                        }
                      >
                        {order.orderStatus.orderStatusName}
                      </button>
                    )}
                  </td>
                  <button
                    className="createdocument-btn"
                    onClick={() =>
                      navigate(
                        "/admin/create-order-document/" +
                          order.orderId +
                          "/" +
                          order.orderStatusId
                      )
                    }
                  >
                    Create Order Document
                  </button>
                  <button
                    className="createtransportation-btn"
                    onClick={() =>
                      navigate(
                        "/admin/create-transportation-report/" + order.orderId
                      )
                    }
                  >
                    Transportation Report
                  </button>
                </tr>
              );

              if (
                (user.roleId === 3 && order.orderStatusId === 1) ||
                user.roleId != 3
              ) {
                console.log("User ID: " + user.roleId);
                console.log("Order Status ID: " + order.orderStatusId);
                return data;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
