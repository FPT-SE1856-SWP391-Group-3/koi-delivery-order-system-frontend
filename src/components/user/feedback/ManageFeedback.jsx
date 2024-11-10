import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../api/CallAPI";
import ComponentPath from "routes/ComponentPath";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserSideNav from "../UserSideNav";
import CreateFeedback from "./CreateFeedback";
import UserToast from "../alert/UserToast";
import { ToastContainer } from "react-toastify";

export default function ManageFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!userId) {
        alert("User ID is not set. Please log in.");
        return;
      }
      try {
    api.get(`CustomerFeedbacks/${userId}`).then ((response) => {
        if (!response || !response.success) {
          UserToast("error", "Không có phản hồi!");
          return;
        }
        if (response.customerFeedback) {
          setFeedbacks(response.customerFeedback);
        } else {
          UserToast("error", "Không công phản hồi!");
        }
      });
      } catch (error) {
        if (error.response && error.response.status === 401) {
         UserToast("error", "Vui lọc đăng nhập!");
        } else if (error.response && error.response.status === 404) {
          UserToast("error", "Không có phản hồi!");
        } else {
          console.error("Error during fetching feedbacks:", error);
       UserToast("error", "Không công phản hồi!");
        }
      }
    };

    fetchFeedbacks();
  }, [userId]);

  async function deleteFeedback(feedbackId) {
    try {
      const response = await api.del(`CustomerFeedbacks/${feedbackId}`);
      if (response.success) { // Adjusted to check response structure
        UserToast("success", "Xóa thành công!");
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter(
            (feedback) => feedback.customerFeedbackId !== feedbackId
          )
        );
      } else {
        UserToast("error", "Xóa thất bại!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      UserToast("error", "Đã xảy ra lỗi khi xóa phản hồi. Vui lòng thử lại.");
    }
  }

  const handleFeedbackCreated = async () => {
    setShowDetailModal(false); // Close the modal after creating feedback
    try {
      await api.get(`CustomerFeedbacks/order/${userId}`).then((response) => {
        if (response.success) {
          setFeedbacks(response.customerFeedback);
        }
      });
    }catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <UserSideNav>
        <Box sx={{ display: "block", marginInline: "1em" }}>
          <Typography variant="h4" gutterBottom>
            Quản lý phản hồi
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã phản hồi</TableCell>
                  <TableCell>Mã khách hàng</TableCell>
                  <TableCell>Mã đơn hàng</TableCell>
                  <TableCell>Trạng thái giải quyết</TableCell>
                  <TableCell>Bình luận</TableCell>
                  <TableCell>Ngày gửi</TableCell>
                  <TableCell>Ngày giải quyết</TableCell>
                  <TableCell>Đánh giá</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.customerFeedbackId}>
                    <TableCell>{feedback.customerFeedbackId}</TableCell>
                    <TableCell>{feedback.customerId}</TableCell>
                    <TableCell>{feedback.orderId}</TableCell>
                    <TableCell>{feedback.resolutionStatusName}</TableCell>
                    <TableCell>{feedback.comment}</TableCell>
                    <TableCell>{feedback.submittedDate}</TableCell>
                    <TableCell>{feedback.resolutionDate}</TableCell>
                    <TableCell>{feedback.rating}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteFeedback(feedback.customerFeedbackId)}
                        sx={{ mr: 1 }}
                      >
                        Xóa
                      </Button>
                      <Button
                        component={Link}
                        to={`${ComponentPath.user.feedback.editFeedback}${feedback.customerFeedbackId}`}
                        variant="contained"
                        color="primary"
                      >
                        Sửa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowDetailModal(true)}
            sx={{ mt: 2 }}
          >
            Tạo phản hồi
          </Button>
          <Modal
            open={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            aria-labelledby="modal-create-feedback"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <CreateFeedback customerId={userId} onSuccess={handleFeedbackCreated}  />
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => setShowDetailModal(false)}>Close</Button>
                
              </Box>
            </Box>
          </Modal>
        </Box>
      </UserSideNav>
    </div>
  );
}
