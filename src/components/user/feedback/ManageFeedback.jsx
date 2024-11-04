import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../../../api/CallAPI"
import ComponentPath from "routes/ComponentPath"
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
} from "@mui/material"
import UserSideNav from "../UserSideNav"
import { Grid } from "@mui/joy"
import { Create } from "@mui/icons-material"
import CreateFeedback from "./CreateFeedback"

export default function ManageFeedBack() {
    const [feedbacks, setFeedbacks] = useState([])
    const navigate = useNavigate()
    const id = localStorage.getItem("userId")

    const [showDetailModal, setShowDetailModal] = useState(false)

    useEffect(() => {
        try {
            // Goi API lay danh sach phan hoi theo id
            api.get("CustomerFeedbacks/order/" + id).then((data) => {
                if (data.success) {
                    setFeedbacks(data.customerFeedback)
                    console.log(data.customerFeedback)
                } else {
                    alert("Không có phản hồi!")
                }
            })
        } catch (error) {
            alert("An error has occurred. Please try again.")
        }
    }, [id])

    async function deleteFeedback(feedbackId) {
        try {
            api.del("CustomerFeedbacks/" + feedbackId).then((data) => {
                if (data.success) {
                    alert("Xóa thành công!")
                    const newFeedbacks = feedbacks.filter(
                        (feedback) => feedback.customerFeedbackId !== feedbackId
                    )
                    setFeedbacks(newFeedbacks)
                } else {
                    alert("Xóa thất bại!")
                }
            })
        } catch (error) {
            console.error("Error during deletion:", error)
            alert("An error occurred during deletion. Please try again.")
        }
    }

    return (
        <div>
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
                                        <TableCell>
                                            {feedback.customerFeedbackId}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.customerId}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.orderId}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.resolutionStatusName}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.comment}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.submittedDate}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.resolutionDate}
                                        </TableCell>
                                        <TableCell>{feedback.rating}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    deleteFeedback(
                                                        feedback.customerFeedbackId
                                                    )
                                                }
                                                sx={{ mr: 1 }}
                                            >
                                                Xóa
                                            </Button>
                                            <Button
                                                component={Link}
                                                to={
                                                    ComponentPath.user.feedback
                                                        .editFeedback +
                                                    feedback.customerFeedbackId
                                                }
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
                            <CreateFeedback id={id} />
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </UserSideNav>
        </div>
    )
}
