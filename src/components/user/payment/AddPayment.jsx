import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI"; // Assuming this is your axios instance

export default function AddPayment() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId")) || null; // Getting user ID from local storage

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Add userId to form data
      data.userId = userId;

      // Call the API to add payment
      const response = await api.post("Payments/", data);

      if (response.data.success) {
        alert("Thêm thành công!");
        navigate("/user-payment");
      } else {
        alert("Thêm thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error! Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Thêm Thanh toán mới</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Hidden input for userId */}
            <input
              type="hidden"
              id="userId"
              name="userId"
              value={userId}
              {...register("userId")}
            />

            {/* Payment Method Input */}
            <div className="form-group">
              <label htmlFor="paymentMethod">Kiểu thanh toán</label>
              <select
                className="form-control"
                id="paymentMethod"
                name="paymentMethod"
                {...register("paymentMethod", { required: true })}
              >
                <option value="credit-card">Thẻ tín dụng</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Chuyển khoản ngân hàng</option>
              </select>
            </div>

            {/* Payment Number Input */}
            <div className="form-group">
              <label htmlFor="paymentNumber">Số tài khoản / Số thẻ</label>
              <input
                type="text"
                className="form-control"
                id="paymentNumber"
                name="paymentNumber"
                {...register("paymentNumber", { required: true })}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
