import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";

import { useForm } from "react-hook-form";

export default function AddPaymentType() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));

  // Add payment type
  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("PaymentMethods/", data).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
          navigate("/");
        } else {
          alert("Thêm thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Thêm loại thanh toán mới</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="paymentMethodName">Tên loại thanh toán</label>
                <input
                  type="text"
                  className="form-control"
                  id="paymentMethodName"
                  name="paymentMethodName"
                  {...register("paymentMethodName")}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
