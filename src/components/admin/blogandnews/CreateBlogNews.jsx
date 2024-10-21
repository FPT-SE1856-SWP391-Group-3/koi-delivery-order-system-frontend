import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";

import { useForm } from "react-hook-form";

export default function CreateBlogNews() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));

  // Add blog/news
  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("BlogNews", data).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
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
            <h2 className="text-center">Thêm Blog/News mới</h2>
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
                <label htmlFor="title">Tiêu đề</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  {...register("title")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Nội dung</label>
                <textarea
                  className="form-control"
                  id="content"
                  name="content"
                  {...register("content")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Thể loại</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  {...register("category")}
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
