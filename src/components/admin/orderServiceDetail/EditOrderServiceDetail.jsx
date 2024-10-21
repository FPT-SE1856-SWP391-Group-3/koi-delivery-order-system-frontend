import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";

import { useEffect } from "react";
import { useState } from "react";

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
          navigate("/");
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
    <div>
      <div className="content">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Chỉnh sửa chi tiết dịch vụ đơn hàng</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="orderServiceDetailName">Tên dịch vụ</label>
              <input
                type="text"
                className="form-control"
                id="orderServiceDetailName"
                name="orderServiceDetailName"
                {...register("orderServiceDetailName")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="orderServiceDetailPrice">Giá</label>
              <input
                type="text"
                className="form-control"
                id="orderServiceDetailPrice"
                name="orderServiceDetailPrice"
                {...register("orderServiceDetailPrice")}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Chỉnh sửa
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
