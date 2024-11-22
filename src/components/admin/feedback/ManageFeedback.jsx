import React, { useEffect, useState } from "react"
import api from "../../../api/CallAPI"
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Alert,
    Button,
    Modal,
    TextField,
} from "@mui/material"
import AdminSideMenu from "../../admin/components/AdminSideMenu"

export default function ViewFeedback() {
    const [feedbacks, setFeedbacks] = useState([])
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertSeverity, setAlertSeverity] = useState("success")
    const [showAnswerModal, setShowAnswerModal] = useState(false)
    const [selectedFeedback, setSelectedFeedback] = useState(null)
    const [answer, setAnswer] = useState("")

    // Fetch all feedbacks on component mount
    useEffect(() => {
        fetchAllFeedbacks()
    }, [])

    // Fetch all feedbacks
    const fetchAllFeedbacks = async () => {
        try {
            const data = await api.get("customer-feedbacks")
            const data = await api.get("customer-feedbacks")

            if (Array.isArray(data) && data.length > 0) {
                setFeedbacks(data)
            } else {
                setAlertMessage("No feedback available!")
                setAlertSeverity("warning")
            }
        } catch (error) {
            console.error("Error fetching feedbacks:", error)
            setAlertMessage("An error occurred while fetching feedbacks.")
            setAlertSeverity("error")
        }
    }

    // Delete feedback by ID
    const handleDeleteFeedback = async (feedbackId) => {
        try {
            const data = await api.del(`customer-feedbacks/${feedbackId}`)
            const data = await api.del(`customer-feedbacks/${feedbackId}`)
            if (data.success) {
                setFeedbacks((prevFeedbacks) =>
                    prevFeedbacks.filter(
                        (feedback) => feedback.customerFeedbackId !== feedbackId
                    )
                )
                setAlertMessage("Feedback deleted successfully!")
                setAlertSeverity("success")
            } else {
                setAlertMessage("Failed to delete feedback.")
                setAlertSeverity("error")
            }
        } catch (error) {
            console.error("Error deleting feedback:", error)
            setAlertMessage("An error occurred during deletion.")
            setAlertSeverity("error")
        }
        fetchAllFeedbacks()
    }

    // Answer feedback as admin
    const handleAnswerFeedback = async () => {
        if (!answer.trim()) {
            setAlertMessage("Answer cannot be empty.")
            setAlertSeverity("warning")
            return
        }

        try {
            const data = await api.put(
                `customer-feedbacks/${selectedFeedback.customerFeedbackId}`,
                {
                    resolutionAnswer: answer,
                    resolutionStatusId: 1, // assuming 1 is the ID for "answered" status; adjust as needed
                }
            )

            if (data.success) {
                setAlertMessage("Answer submitted successfully!")
                setAlertSeverity("success")
                setShowAnswerModal(false)
                fetchAllFeedbacks() // Refresh feedback list
                setAnswer("") // Reset the answer field
            } else {
                setAlertMessage("Failed to submit answer.")
                setAlertSeverity("error")
            }
        } catch (error) {
            console.error("Error submitting answer:", error)
            setAlertMessage("An error occurred while submitting the answer.")
            setAlertSeverity("error")
        }
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Box sx={{ width: 240, flexShrink: 0 }}>
                <AdminSideMenu />
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    View Feedback
                </Typography>

                {alertMessage && (
                    <Alert
                        severity={alertSeverity}
                        onClose={() => setAlertMessage(null)}
                        sx={{ mb: 2 }}
                    >
                        {alertMessage}
                    </Alert>
                )}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Feedback ID</TableCell>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>Submitted Date</TableCell>
                                <TableCell>Resolution Date</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Answer</TableCell>{" "}
                                {/* New Column for Answer */}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback) => (
                                    <TableRow key={feedback.customerFeedbackId}>
                                        <TableCell>
                                            {feedback.customerFeedbackId}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.customer?.userId}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.order?.orderId}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.resolution
                                                ?.resolutionStatusId ||
                                                "Pending"}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.comment}
                                        </TableCell>
                                        <TableCell>
                                            {feedback.submittedDate}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                feedback.resolution
                                                    ?.resolutionDate
                                            }
                                        </TableCell>
                                        <TableCell>{feedback.rating}</TableCell>
                                        <TableCell>
                                            {feedback.resolution
                                                ?.resolutionAnswer ||
                                                "No answer yet"}
                                        </TableCell>{" "}
                                        {/* Display Answer */}
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteFeedback(
                                                        feedback.customerFeedbackId
                                                    )
                                                }
                                                sx={{ mr: 1 }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    setSelectedFeedback(
                                                        feedback
                                                    )
                                                    setShowAnswerModal(true)
                                                }}
                                            >
                                                Answer
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        No feedback available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Answer Feedback Modal */}
                <Modal
                    open={showAnswerModal}
                    onClose={() => setShowAnswerModal(false)}
                    aria-labelledby="modal-answer-feedback"
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
                            minWidth: 300,
                        }}
                    >
                        <Typography variant="h6">Answer Feedback</Typography>
                        <TextField
                            label="Answer"
                            fullWidth
                            multiline
                            rows={4}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            sx={{ mt: 2, mb: 2 }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 2,
                            }}
                        >
                            <Button onClick={() => setShowAnswerModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAnswerFeedback}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}
