import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";

import { useForm } from "react-hook-form";
import { useEffect } from "react";

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
    <div>
      <h1>Order Services</h1>
      <a href="/admin/addOrderServiceDetail">Add Order Service</a>
      {orderServiceDetails.map((orderServiceDetail) => (
        <div key={orderServiceDetail.orderServiceDetailId}>
          <h3>OrderServiceId: {orderServiceDetail.orderServiceDetailId}</h3>
          <h3>Name: {orderServiceDetail.orderServiceDetailName}</h3>
          <h3>Price: {orderServiceDetail.orderServiceDetailPrice}</h3>
          <button
            onClick={() =>
              deleteOrderService(orderServiceDetail.orderServiceDetailId)
            }
          >
            Delete
          </button>
          <a
            href={
              "/admin/updateOrderServiceDetail/" +
              orderServiceDetail.orderServiceDetailId
            }
          >
            Update
          </a>
        </div>
      ))}
    </div>
  );
}
