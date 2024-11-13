import { useForm } from "react-hook-form"
import api from "../../../api/CallAPI"
import { Box, Button, TextField, Typography } from "@mui/material"
import "../report/CreateTransportationReportDetails.css"

export default function CreateTransportationReportDetails({
    orderId,
    onClose,
    onAddSuccess,
}) {
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await api.post("TransportationReportDetails", {
                ...data,
                orderId,
            })
            if (response.success) {
                alert("Thêm báo cáo thành công!")
                onAddSuccess() // Cập nhật danh sách sau khi thêm thành công
                onClose() // Đóng modal
            } else {
                alert("Thêm báo cáo thất bại!")
            }
        } catch (error) {
            console.error("Error during registration:", error)
            alert("An error occurred during registration. Please try again.")
        }
    }

    return (
        <Box className="transportation-container" sx={{ padding: 1.5 }}>
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
