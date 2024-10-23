import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useForm } from "react-hook-form";
import "../faq/NewFaq.css";

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
    <>
      <a className="back-button" href="/admin/manage-faq">
        Back
      </a>
      <div className="addfaq-container">
        <h1 className="form-title">Add new FAQ</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="addfaq-form">
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <input
              type="text"
              id="question"
              name="question"
              {...register("question")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer</label>
            <textarea id="answer" name="answer" {...register("answer")} />
          </div>
          <button type="submit" className="btn-add">
            ADD
          </button>
        </form>
      </div>
    </>
  );
}
