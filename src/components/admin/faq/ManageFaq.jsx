import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../faq/ManageFaq.css";

export default function ManageFaq() {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      api.get("Faqs/").then((data) => {
        if (data.success) {
          setFaqs(data.faqs);
          console.log(data.faqs);
        } else {
          console.log("Không có địa chỉ!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, []);

  async function deleteFaq(faqId) {
    try {
      api.del("Faqs/" + faqId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newFaqs = faqs.filter((faq) => faq.faqId !== faqId);
          setFaqs(newFaqs);
        } else {
          alert("Xóa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
  }

  return (
    <div>
      <Sidebar />
      <div className="content-container">
        <h1>Manage FAQs</h1>
        <a href="/admin/new-faq/" className="add-fag-btn">
          Add FAQ
        </a>
        <table className="fag-table">
          <thead>
            <th>FAQId</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Action</th>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.faqid}>
                <td>{faq.faqid}</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <button
                    onClick={() => deleteFaq(faq.faqid)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <a
                    href={"/admin/update-faq/" + faq.faqid}
                    className="update-btn"
                  >
                    Update
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
