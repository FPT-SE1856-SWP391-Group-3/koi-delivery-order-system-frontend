import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useForm } from "react-hook-form";
import "../payment/AddPaymentMethod.css";

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
          navigate("/admin/manage-payment-type");
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
    <>
      <a className="back-button" href="/admin/manage-payment-type">
        Back
      </a>
      <div className="addpayment-container">
        <h className="form-title">Add new Payment Method</h>
        <form onSubmit={handleSubmit(onSubmit)} className="addpayment-form">
          <div className="form-group">
            <label htmlFor="paymentMethodName">Payment type name</label>
            <input
              type="text"
              id="paymentMethodName"
              name="paymentMethodName"
              {...register("paymentMethodName")}
            />
          </div>
          <button type="submit" className="btn-add">
            ADD
          </button>
        </form>
      </div>
    </>
  );
}
