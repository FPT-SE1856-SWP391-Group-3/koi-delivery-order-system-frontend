import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import "../faq/UpdateFag.css";

export default function UpdateFaq({ faqId, onClose, onUpdateSuccess }) {
  const [updateFaq, setUpdateFaq] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    // Gọi API để lấy thông tin FAQ dựa trên faqId
    const fetchFaq = async () => {
      try {
        const data = await api.get("Faqs/" + faqId);
        if (data.success) {
          setUpdateFaq(data.faq);
        } else {
          alert("Không tìm thấy FAQ!");
        }
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        alert("An error occurred while fetching the FAQ.");
      }
    };

    if (faqId) fetchFaq();
  }, [faqId]);

  // Cập nhật FAQ
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
      const data = await api.put("Faqs/" + faqId, updateFaq);
      if (data.success) {
        alert("Cập nhật thành công!");
        onUpdateSuccess(); // Gọi callback để cập nhật danh sách FAQ
        onClose(); // Đóng modal sau khi cập nhật thành công
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  return (
    <div className="updatefaq-container">
      <h2 className="form-title">Update FAQ</h2>
      <form onSubmit={handleSubmit} className="updatefaq-form">
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            value={updateFaq.question}
            onChange={(e) =>
              setUpdateFaq({ ...updateFaq, question: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            id="answer"
            value={updateFaq.answer}
            onChange={(e) =>
              setUpdateFaq({ ...updateFaq, answer: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn-update">
          UPDATE
        </button>
      </form>
    </div>
  );
}
