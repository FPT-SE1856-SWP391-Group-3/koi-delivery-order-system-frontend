import { useForm } from "react-hook-form"
import api from "../../../api/CallAPI"
import { Box, Button, TextField, Typography } from "@mui/material"
import "../report/CreateTransportationReportDetails.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function CreateTransportationReportDetails({
    orderId,
    onClose,
}) {
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        try {
            const response = await api.post("transportation-report-details", {
                ...data,
                orderId,
            })
            if (response.success) {
                UserToast(
                    "success",
                    "Transportation report added successfully!"
                )
                onClose() // Đóng modal
            } else {
                UserToast("error", "Failed to add transportation report!")
            }
        } catch (error) {
            console.error("Error during registration:", error)
            UserToast("error", "Error! Please try again.")
        }
    }

    return (
        <Box className="transportation-container" sx={{ padding: 1.5 }}>
            <ToastContainer />
            <Typography variant="h6" className="form-title" gutterBottom>
                Add New Transportation Report
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="transportation-form"
            >
                <TextField
                    label="Order ID"
                    variant="outlined"
                    type="number"
                    value={orderId}
                    InputProps={{ readOnly: true }}
                    fullWidth
                    margin="dense"
                    {...register("orderId")}
                />
                <TextField
                    label="Type of Problem"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="dense"
                    {...register("issueTypeId")}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    margin="dense"
                    {...register("description")}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="btn-add"
                    fullWidth
                    sx={{ mt: 1.5 }}
                >
                    ADD
                </Button>
            </form>
        </Box>
    )
}
