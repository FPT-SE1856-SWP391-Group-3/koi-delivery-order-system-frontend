import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useEffect } from "react";
import { useState } from "react";
import "../orderServiceDetail/EditOrderServiceDetail.css";

export default function EditOrderServiceDetail() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      api.get("OrderServiceDetails/" + id).then((data) => {
        if (data.success) {
          setValue(
            "orderServiceDetailName",
            data.orderServiceDetail.orderServiceDetailName
          );
          setValue(
            "orderServiceDetailPrice",
            data.orderServiceDetail.orderServiceDetailPrice
          );
          console.log(data.orderServiceDetails);
        } else {
          console.log("Không có địa chỉ!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [id, setValue]);

  // Chỉnh sửa chi tiết dịch vụ đơn hàng
  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.put("OrderServiceDetails/" + id, data).then((data) => {
        if (data.success) {
          alert("Chỉnh sửa thành công!");
          navigate("/admin/manage-order-service-detail");
        } else {
          alert("Chỉnh sửa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  return (
    <>
      <a className="back-button" href="/admin/manage-order-service-detail">
        Back
      </a>
      <div className="update-orderservice-container">
        <h1 className="form-title">Update Order service details</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="update-orderservice-form"
        >
          <div className="form-group">
            <label htmlFor="orderServiceDetailName">Service Name</label>
            <input
              type="text"
              id="orderServiceDetailName"
              name="orderServiceDetailName"
              {...register("orderServiceDetailName")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="orderServiceDetailPrice">Price</label>
            <input
              type="text"
              id="orderServiceDetailPrice"
              name="orderServiceDetailPrice"
              {...register("orderServiceDetailPrice")}
            />
          </div>
          <button type="submit" className="btn-update">
            UPDATE
          </button>
        </form>
      </div>
    </>
  );
}
