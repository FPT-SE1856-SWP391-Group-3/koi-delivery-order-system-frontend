import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";

import { useForm } from "react-hook-form";

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
          navigate("/");
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
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Thêm Koi mới</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="hidden"
                  id="userId"
                  name="userId"
                  value={userId}
                  {...register("userId")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="koiTypeId">Loại Koi</label>
                <input
                  type="text"
                  className="form-control"
                  id="koiTypeId"
                  name="koiTypeId"
                  {...register("koiTypeId")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="koiName">Tên Koi</label>
                <input
                  type="text"
                  className="form-control"
                  id="koiName"
                  name="koiName"
                  {...register("koiName")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Trọng lượng</label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  {...register("weight")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  {...register("price")}
                />
              </div>
              <button
                type="button" // Prevent form submission
                className="btn btn-primary"
                onClick={addCertification} // Call function directly
              >
                Thêm chứng chỉ
              </button>{" "}
              <button
                type="button"
                className="btn btn-primary"
                onClick={deleteCertification}
              >
                Xoa chung chi
              </button>
              {certificationId.map((koiCertification, index) => (
                <div key={index}>
                  <div className="form-group">
                    <label htmlFor="koiCertificationId">
                      Chứng chỉ {index + 1}
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
