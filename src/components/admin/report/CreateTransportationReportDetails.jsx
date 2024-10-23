import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import "../report/CreateTransportationReportDetails.css";

export default function CreateTransportationReportDetails() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));
  let { orderId } = useParams();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("TransportationReportDetails", data).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
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
      <a className="back-button" href="/admin/manage-order">
        Back
      </a>
      <div className="transportation-container">
        <h1 className="form-title">Add new Transportation Report</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="transportation-form">
          <div className="form-group">
            <label htmlFor="orderId">OrderId</label>
            <input
              type="number"
              className="form-control"
              id="orderId"
              name="orderId"
              value={orderId}
              readOnly
              {...register("orderId")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="issueTypeId">Type of problem</label>
            <input
              type="number"
              className="form-control"
              id="issueTypeId"
              name="issueTypeId"
              {...register("issueTypeId")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              {...register("description")}
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
