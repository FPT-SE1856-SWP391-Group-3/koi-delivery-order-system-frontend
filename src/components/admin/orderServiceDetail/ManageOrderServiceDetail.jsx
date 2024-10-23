import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Sidebar from "../../user/common/Sidebar";
import "../orderServiceDetail/OrderServiceDetail.css";

export default function ManageOrderServiceDetail() {
  const [orderServiceDetails, setOrderServiceDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      api.get("OrderServiceDetails/").then((data) => {
        if (data.success) {
          setOrderServiceDetails(data.orderServiceDetails);
          console.log(data.orderServiceDetails);
        } else {
          console.log("Không có địa chỉ!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, []);

  async function deleteOrderService(orderServiceDetailId) {
    try {
      console.log(
        url("OrderServices/deleteOrderServiceDetail/" + orderServiceDetailId)
      );
      const response = await fetch(
        url("OrderServices/deleteOrderServiceDetail/" + orderServiceDetailId),
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
            orderServiceDetail.orderServiceDetailId !== orderServiceDetailId
        );
        setOrderServiceDetails(newOrderServiceDetails);
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
  }

  return (
    <>
      <div>
        <Sidebar />
        <div className="content-container">
          <h1>Manage Order Services</h1>
          <a
            href="/admin/add-order-service-detail/"
            className="add-service-btn"
          >
            Add Order Service
          </a>
          <table className="orderservice-table">
            <thead>
              <th>OrderServiceId</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </thead>
            <tbody>
              {orderServiceDetails.map((orderServiceDetail) => (
                <tr key={orderServiceDetail.orderServiceDetailId}>
                  <td>{orderServiceDetail.orderServiceDetailId}</td>
                  <td>{orderServiceDetail.orderServiceDetailName}</td>
                  <td>{orderServiceDetail.orderServiceDetailPrice}</td>
                  <td>
                    <button
                      onClick={() =>
                        deleteOrderService(
                          orderServiceDetail.orderServiceDetailId
                        )
                      }
                      className="delete-btn"
                    >
                      Delete
                    </button>
                    <a
                      href={
                        "/admin/update-order-service-detail/" +
                        orderServiceDetail.orderServiceDetailId
                      }
                      className="update-btn"
                    >
                      Update
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
