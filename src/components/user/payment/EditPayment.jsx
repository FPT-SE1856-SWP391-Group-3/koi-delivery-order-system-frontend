import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api/CallAPI"
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material"
import UserToast from "../alert/UserToast"

export default function EditPayment({ id }) {
    const [payment, setPayment] = useState()
    const navigate = useNavigate()
    let userId = JSON.parse(localStorage.getItem("userId"))

    const [showEditPaymentModal, setShowEditPaymentModal] = useState(false)

    useEffect(() => {
        try {
            api.get("Payments/" + userId).then((data) => {
                if (data.success) {
                    setPayment(data.payment[0])
                    console.log(data.payment[0])
                } else {
                    UserToast("error", "No payment found.")
                }
            })
        } catch (error) {
            alert("An error has occurred. Please try again.")
        }
    }, [id])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            api.put("Payments/" + id, payment).then((data) => {
                if (data.success) {
                    UserToast("success", "Sửa thanh toán thành công!")
                    navigate("/user-payment")
                } else {
                    UserToast("error", "Sửa thanh toán thất bại!")
                }
            })
        } catch (error) {
            console.error("Error!:", error)
            alert("Error!. Please try again.")
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Update Payment
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <input
                        type="hidden"
                        value={userId}
                        onChange={(e) =>
                            setPayment({ ...payment, userId: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Kiểu thanh toán"
                        value={payment?.paymentMethodId || ""}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                paymentMethodId: e.target.value,
                            })
                        }
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Số tài khoản"
                        value={payment?.paymentNumber || ""}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                paymentNumber: e.target.value,
                            })
                        }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Add
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
