import { useForm } from "react-hook-form"
import { Box, Button, TextField, Typography } from "@mui/material"
import api from "../../../api/CallAPI"
import "../faq/NewFaq.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function NewFaq({ onClose, onAddSuccess }) {
    const { register, handleSubmit } = useForm()

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await api.post("faqs/", data)
            if (response.success) {
                UserToast("success", "FAQ added successfully!")
                onAddSuccess() // Callback to update the FAQ list in ManageFaq
                onClose() // Close modal on successful addition
            } else {
                UserToast("error", "Failed to add FAQ!")
            }
        } catch (error) {
            console.error("Error during registration:", error)
            UserToast("error", "An error occurred. Please try again.")
        }
    }

    return (
        <Box
            className="addfaq-container"
            padding={3}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <ToastContainer />
            <Typography variant="h5" className="form-title" gutterBottom>
                Add New FAQ
            </Typography>

            <TextField
                label="Question"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("question")}
            />

            <TextField
                label="Answer"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                {...register("answer")}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="btn-add"
                sx={{ marginTop: 2 }}
            >
                Add
            </Button>
        </Box>
    )
}
