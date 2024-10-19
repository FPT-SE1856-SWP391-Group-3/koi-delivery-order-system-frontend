import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";

import { useForm } from "react-hook-form";

export default function NewFaq() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));

  // Add FAQ
  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("Faqs/", data).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
          navigate("/admin/manage-faq");
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
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Thêm FAQ mới</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="question">Câu hỏi</label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  name="question"
                  {...register("question")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="answer">Câu trả lời</label>
                <textarea
                  className="form-control"
                  id="answer"
                  name="answer"
                  {...register("answer")}
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
