import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import {
    Container,
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material"
import UserToast from "../alert/UserToast"
import ComponentPath from "../../../routes/ComponentPath"
import { ToastContainer } from "react-toastify"

export default function AddPayment() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem("userId")) || null

    const onSubmit = async (data) => {
        try {
            data.userId = userId
            const response = await api.post("Payments/", data)

            if (response.data.success) {
                UserToast("success", "Add payment successfully!")
                navigate(ComponentPath.user.payment.viewPayment)
            } else {
                UserToast("error", "Failed to add payment!")
            }
        } catch (error) {
            console.error("Error:", error)
            UserToast("error", "Error! Please try again.")
        }
    }

    return (
        <Container maxWidth="sm">
            <ToastContainer />
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    gutterBottom
                >
                    Thêm Thanh toán mới
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <input
                        type="hidden"
                        id="userId"
                        name="userId"
                        value={userId}
                        {...register("userId")}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="payment-method-label">
                            Kiểu thanh toán
                        </InputLabel>
                        <Select
                            labelId="payment-method-label"
                            id="paymentMethod"
                            label="Kiểu thanh toán"
                            defaultValue=""
                            {...register("paymentMethod", { required: true })}
                        >
                            <MenuItem value="credit-card">
                                Thẻ tín dụng
                            </MenuItem>
                            <MenuItem value="paypal">PayPal</MenuItem>
                            <MenuItem value="bank-transfer">
                                Chuyển khoản ngân hàng
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        id="paymentNumber"
                        label="Số tài khoản / Số thẻ"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        {...register("paymentNumber", { required: true })}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Thêm
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
