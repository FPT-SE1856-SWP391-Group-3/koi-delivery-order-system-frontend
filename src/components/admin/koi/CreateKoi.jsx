import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useForm } from "react-hook-form";
import "../koi/CreateKoi.css";
import ComponentPath from "../../../routes/ComponentPath";

export default function CreatKoi({ onClose, onAddSuccess }) {
  const { register, handleSubmit } = useForm();
  const [certificationId, setCertificationId] = useState([""]);

  const addCertification = () => {
    setCertificationId([...certificationId, ""]);
  };

  const deleteCertification = () => {
    const list = [...certificationId];
    list.pop();
    setCertificationId(list);
  };

  const onSubmit = async (data) => {
    const koiData = {
      data,
      certificationId,
    };
    try {
      const response = await api.post("Kois", koiData);
      if (response.success) {
        alert("Thêm thành công!");
        onAddSuccess(); // Gọi callback để cập nhật danh sách Koi
        onClose(); // Đóng modal sau khi thêm thành công
      } else {
        alert("Thêm thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error! Please try again.");
    }
  };

  return (
    <div className="addkoi-container">
      <h1 className="form-title">Add a new Koi</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="add-form">
        <div className="form-group">
          <label htmlFor="koiTypeId">Koi Type</label>
          <input
            required
            type="text"
            className="form-control"
            id="koiTypeId"
            name="koiTypeId"
            {...register("koiTypeId")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="koiName">Koi Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="koiName"
            name="koiName"
            {...register("koiName")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight(kg)</label>
          <input
            required
            type="text"
            className="form-control"
            id="weight"
            name="weight"
            {...register("weight")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            required
            type="text"
            className="form-control"
            id="price"
            name="price"
            {...register("price")}
          />
        </div>
        <button
          type="button"
          className="btn-add-certificate"
          onClick={addCertification}
        >
          Add Certificate [+]
        </button>
        <button
          type="button"
          className="btn-delete-certificate"
          onClick={deleteCertification}
        >
          Delete Certificate [-]
        </button>
        {certificationId.map((koiCertification, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`koiCertificationId${index}`}>
              Certificate {index + 1}
            </label>
            <input
              type="text"
              className="form-control"
              id={`koiCertificationId${index}`}
              name="koiCertificationId"
              onChange={(e) => {
                const newCertifications = [...certificationId];
                newCertifications[index] = e.target.value;
                setCertificationId(newCertifications);
              }}
            />
          </div>
        ))}
        <button type="submit" className="btn-add">
          ADD
        </button>
      </form>
    </div>
  );
}
