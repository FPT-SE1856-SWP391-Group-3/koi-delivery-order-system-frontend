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
import CreateFeedback from "./CreateFeedback"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function ManageFeedback() {
    const [feedbacks, setFeedbacks] = useState([])
    const [showDetailModal, setShowDetailModal] = useState(false)
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        const fetchFeedbacks = async () => {
            if (!userId) {
                UserToast("error", "Please login!")
                return
            }
            try {
                api.get(`customer-feedbacks/customer/${userId}`).then((response) => {
                    if (!response || !response.success) {
                        UserToast("error", "No feedback!")
                        return
                    }
                    if (response.feedbacks) {
                        setFeedbacks(response.feedbacks)
                    } else {
                        UserToast("error", "No feedback!")
                    }
                })
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    UserToast("error", "Please Login!")
                } else if (error.response && error.response.status === 404) {
                    UserToast("error", "Not responding!")
                } else {
                    console.error("Error during fetching feedbacks:", error)
                    UserToast("error", "Cannot load feedbacks!")
                }
            }
        }

        fetchFeedbacks()
    }, [userId])

    async function deleteFeedback(feedbackId) {
        try {
            const response = await api.del(`customer-feedbacks/${feedbackId}`)
            if (response.success) {
                // Adjusted to check response structure
                UserToast("success", "Xóa thành công!")
                setFeedbacks((prevFeedbacks) =>
                    prevFeedbacks.filter(
                        (feedback) => feedback.customerFeedbackId !== feedbackId
                    )
                )
            } else {
                UserToast("error", "fail to delete!")
            }
        } catch (error) {
            console.error("Error during deletion:", error)
            UserToast("error", "Error occured while loading feedbacks")
        }
    }

    const handleFeedbackCreated = async () => {
        setShowDetailModal(false) // Close the modal after creating feedback
        try {
            await api
                .get(`customer-feedbacks/order/${userId}`)
                .then((response) => {
                    if (response.success) {
                        setFeedbacks(response.customerFeedback)
                    }
                })
        } catch (error) {
            console.error("Error fetching feedbacks:", error)
        }
    }

    return (
        <div>
            <ToastContainer />
            <UserSideNav>
                <Box sx={{ display: "block", marginInline: "1em" }}>
                    <Typography variant="h4" gutterBottom>
                        Feddback Management
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>CustomerID</TableCell>
                                    <TableCell>OrderID</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Comment</TableCell>
                                    <TableCell>Send Date</TableCell>
                                    <TableCell>Solve Date</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Actions</TableCell>
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
                                                Delete
                                            </Button>
                                            <Button
                                                component={Link}
                                                to={`${ComponentPath.user.feedback.editFeedback}${feedback.customerFeedbackId}`}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Update
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
                        Create
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
                            <CreateFeedback
                                customerId={userId}
                                onSuccess={handleFeedbackCreated}
                            />
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
