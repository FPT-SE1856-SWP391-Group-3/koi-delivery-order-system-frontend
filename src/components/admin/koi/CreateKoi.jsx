import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";
import { useForm } from "react-hook-form";

export default function CreatKoi() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));

  //Them dia chi
  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("Kois", data).then((data) => {
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
      <Header />
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
