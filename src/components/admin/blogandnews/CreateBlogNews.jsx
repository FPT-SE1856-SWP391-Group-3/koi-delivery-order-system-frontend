import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useForm } from "react-hook-form";
import "../blogandnews/CreateBlogNews.css";

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
          navigate("/admin/manage-blog-news");
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
      <a className="back-button" href="/admin/manage-blog-news">
        Back
      </a>
      <div className="addblog-container">
        <h1 className="form-title">Add Blog/News</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="addblog-form">
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
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" {...register("title")} />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" {...register("content")} />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              {...register("category")}
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
