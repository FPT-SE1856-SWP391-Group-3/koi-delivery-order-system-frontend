import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";

export default function UpdateFaq() {
  const [updateFaq, setUpdateFaq] = useState({
    question: "",
    answer: "",
  });
  const { faqId } = useParams(); // Lấy faqId từ URL params
  const navigate = useNavigate();
  console.log(faqId);
  console.log(updateFaq);

  useEffect(() => {
    // Gọi API để lấy thông tin FAQ dựa trên faqId
    const fetchFaq = async () => {
      try {
        api.get("Faqs/" + faqId).then((data) => {
          if (data.success) {
            console.log(data.faq);
            setUpdateFaq(data.faq); // Set giá trị vào state
          } else {
            alert("Không tìm thấy FAQ!");
          }
        });
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        alert("An error occurred while fetching the FAQ.");
      }
    };

    fetchFaq();
  }, [faqId]);

  // Cập nhật FAQ
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
      api.put("Faqs/" + faqId, updateFaq).then((data) => {
        if (data.success) {
          alert("Cập nhật thành công!");
          navigate("/admin/manage-faq");
        } else {
          alert("Cập nhật thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Cập nhật FAQ</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="question">Câu hỏi</label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  name="question"
                  value={updateFaq.question}
                  onChange={(e) =>
                    setUpdateFaq({ ...updateFaq, question: e.target.value })
                  } // Xử lý sự kiện thay đổi
                />
              </div>
              <div className="form-group">
                <label htmlFor="answer">Câu trả lời</label>
                <textarea
                  className="form-control"
                  id="answer"
                  name="answer"
                  value={updateFaq.answer}
                  onChange={(e) =>
                    setUpdateFaq({ ...updateFaq, answer: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
