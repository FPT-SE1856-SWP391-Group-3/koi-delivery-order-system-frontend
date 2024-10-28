import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useForm } from "react-hook-form";
import "../koi/CreateKoi.css";
import ComponentPath from "../../../routes/ComponentPath";

export default function CreatKoi() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));
  const [certificationId, setCertificationId] = useState([""]);

  const addCertification = async () => {
    setCertificationId([...certificationId, ""]);
  };

  const deleteCertification = async () => {
    const list = [...certificationId];
    list.pop();
    setCertificationId(list);
  };

  const onSubmit = async (data) => {
    const koiData = {
      data,
      certificationId,
    };
    console.log(koiData);
    try {
      api.post("Kois", koiData).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
          navigate(ComponentPath.admin.koi.manageKoi);
        } else {
          alert("Thêm thất bại!");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error! Please try again.");
    }
  };

  return (
    <>
      <a className="back-button" href={ComponentPath.admin.koi.manageKoi}>
        Back
      </a>
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
            type="button" // Prevent form submission
            className="btn-add-certificate"
            onClick={addCertification} // Call function directly
          >
            Add Certificate [+]
          </button>{" "}
          <button
            type="button"
            className="btn-delete-certificate"
            onClick={deleteCertification}
          >
            Delete Certificate [-]
          </button>
          {certificationId.map((koiCertification, index) => (
            <div key={index}>
              <div className="form-group">
                <label htmlFor="koiCertificationId">
                  Certificate {index + 1}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="koiCertificationId"
                  name="koiCertificationId"
                  onChange={(e) => {
                    certificationId[index] = e.target.value;
                  }}
                />
              </div>
            </div>
          ))}
          <button type="submit" className="btn-add">
            ADD
          </button>
        </form>
      </div>
    </>
  );
}
