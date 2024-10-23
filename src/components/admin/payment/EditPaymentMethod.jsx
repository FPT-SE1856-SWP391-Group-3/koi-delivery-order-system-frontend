import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useEffect, useState } from "react";
import "../payment/EditPaymentMethod.css";

export default function EditPaymentType() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      api.get("PaymentMethods/" + id).then((data) => {
        if (data.success) {
          setValue("paymentMethodName", data.paymentMethod.paymentMethodName);
          console.log(data.paymentMethod.paymentMethodName);
        } else {
          console.log("Không có phương thức thanh toán!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [id, setValue]);

  // Chỉnh sửa phương thức thanh toán
  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.put("PaymentMethods/" + id, data).then((data) => {
        if (data.success) {
          alert("Chỉnh sửa thành công!");
          navigate("/admin/manage-payment-type");
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
      <a className="back-button" href="/admin/manage-payment-type">
        Back
      </a>
      <div className="updatepayment-container">
        <h1 className="form-title">Update payment method</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="updatepayment-form">
          <div className="form-group">
            <label htmlFor="paymentMethodName">Payment method name</label>
            <input
              type="text"
              id="paymentMethodName"
              name="paymentMethodName"
              {...register("paymentMethodName")}
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
