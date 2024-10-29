import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useForm } from "react-hook-form";
import "../faq/NewFaq.css";

export default function NewFaq({ onClose, onAddSuccess }) {
  const { register, handleSubmit } = useForm();

  // Thêm FAQ
  const onSubmit = async (data) => {
    try {
      const response = await api.post("Faqs/", data);
      if (response.success) {
        alert("Thêm thành công!");
        onAddSuccess(); // Gọi callback để cập nhật danh sách trong ManageFaq
        onClose(); // Đóng modal sau khi thêm mới thành công
      } else {
        alert("Thêm thất bại!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
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
  );
}
