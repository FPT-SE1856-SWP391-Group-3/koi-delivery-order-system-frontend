import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../common/Header";
import ComponentPath from "@componentPath";

export default function ManageFeedBack() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    try {
      // Goi API lay danh sach phan hoi theo id
      api.get("CustomerFeedbacks/order/" + id).then((data) => {
        if (data.success) {
          setFeedbacks(data.customerFeedback);
          console.log(data.customerFeedback);
        } else {
          alert("Không có phản hồi!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [id]);

  async function deleteFeedback(feedbackId) {
    try {
     api.del("CustomerFeedbacks/" + feedbackId).then((data) => {
      if (data.success) {
        alert("Xóa thành công!");
        const newFeedbacks = feedbacks.filter(
          (feedback) => feedback.customerFeedbackId !== feedbackId
        );
        setFeedbacks(newFeedbacks);
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
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="container">
              <h2>Quản lý phản hồi</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Mã phản hồi</th>
                    <th>Mã khách hàng</th>
                    <th>Mã đơn hàng</th>
                    <th>Trạng thái giải quyết</th>
                    <th>Bình luận</th>
                    <th>Ngày gửi</th>
                    <th>Ngày giải quyết</th>
                    <th>Đánh giá</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback.customerFeedbackId}>
                      <td>{feedback.customerFeedbackId}</td>
                      <td>{feedback.customerId}</td>
                      <td>{feedback.orderId}</td>
                      <td>{feedback.resolutionStatusName}</td>
                      <td>{feedback.comment}</td>
                      <td>{feedback.submittedDate}</td>
                      <td>{feedback.resolutionDate}</td>
                      <td>{feedback.rating}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            deleteFeedback(feedback.customerFeedbackId)
                          }
                        >
                          Xóa
                        </button>
                        <Link
                          to={{
                            pathname: ComponentPath.user.feedback.editFeedback + feedback.customerFeedbackId,
                            state: feedback,
                          }}
                        >
                          Sửa{" "}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
