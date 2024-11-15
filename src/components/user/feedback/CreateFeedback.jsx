import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    Rating,
} from "@mui/material"
import ComponentPath from "../../../routes/ComponentPath"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function CreateFeedback({ orderId, onSuccess }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()

    // Retrieve userId from localStorage
    const userId = JSON.parse(localStorage.getItem("userId")) || ""
    useEffect(() => {
        if (orderId) {
            setValue("orderId", orderId)
        }
        if (userId) {
            setValue("userId", userId)
        } else {
            console.error("User ID is missing in localStorage.")
            UserToast("error", "User ID is missing. Please log in again.")
            navigate("/login") // Redirect to login if userId is missing
        }
    }, [orderId, userId, setValue, navigate])

    const onSubmit = async (data) => {
        console.log("Form Data:", data)

        try {
            if (!data) {
               UserToast("error", "Invalid data. Please try again.")
                return
            }

            const payload = {
                cusID: data.userId,
                orderId: data.orderId || 0,
                comment: data.comment || "",
                rating: data.rating || 0,
            }

            await api
                .post("CustomerFeedbacks/", payload)
                .then((response) => {
                    if (response) {
                        UserToast("success", "Add feedback successfully!")
                        if (onSuccess) onSuccess() // Callback to refresh feedback list after creation
                        navigate(ComponentPath.user.feedback.viewFeedback)
                    } else {
                        UserToast("error", "Failed to add feedback!")
                    }
                })
                .catch((error) => {
                    console.error("Error during submission:", error)
                    UserToast("error", "Error! Please try again.")
                })
        } catch (error) {
            console.error("Error during submission:", error)
            UserToast("error", "Error! Please try again.")
        }
    }

    return (
        <Box sx={{ p: 2 }}>
            <ToastContainer />
            <Container maxWidth="md">
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography variant="h4">Thêm Phản hồi mới</Typography>
                </Box>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Hidden input for userId */}
                        <input
                            type="hidden"
                            {...register("userId", { value: userId })}
                        />

                        {/* Order ID Input */}
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Mã đơn hàng"
                            type="number"
                            {...register("orderId", { valueAsNumber: true })}
                            defaultValue={orderId}
                            InputProps={{ readOnly: Boolean(orderId) }}
                            error={!!errors.orderId}
                            helperText={
                                errors.orderId
                                    ? "Vui lòng nhập dữ liệu hợp lệ"
                                    : null
                            }
                        />

                        {/* Comment Input */}
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Bình luận"
                            multiline
                            rows={4}
                            {...register("comment")}
                            error={!!errors.comment}
                            helperText={
                                errors.comment
                                    ? "Vui lòng nhập dữ liệu hợp lệ"
                                    : null
                            }
                        />

                        {/* Rating Input */}
                        <Box sx={{ mt: 2 }}>
                            <Typography component="legend">Đánh giá</Typography>
                            <Rating
                                precision={1}
                                max={5}
                                onChange={(event, newValue) => {
                                    setValue("rating", newValue, {
                                        shouldValidate: true,
                                    })
                                }}
                            />
                        </Box>

                        {/* Submit Button */}
                        <Box sx={{ mt: 3 }}>
                            <Button type="submit" variant="contained" fullWidth>
                                Thêm
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}
