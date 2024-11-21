import { useEffect, useState } from "react"
import api from "../../../api/CallAPI"
import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Modal,
} from "@mui/material"
import { Grid } from "@mui/joy"
import EditPayment from "./EditPayment"
import AddPayment from "./AddPayment"
import AdminSideMenu from "../../admin/components/AdminSideMenu"
import SideMenu from "../SideMenu"

export default function UserPayment() {
    const [payments, setPayments] = useState([])
    const [showEditPaymentModal, setShowEditPaymentModal] = useState(false)
    const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
    const [selectedPaymentId, setSelectedPaymentId] = useState(null)
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const roleId = user?.roleId

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await api.get(`Payments/${user.userId}`)
                if (data.success) {
                    setPayments(data.payment)
                } else {
                    alert("Không có phương thức thanh toán!")
                }
            } catch {
                alert("An error has occurred. Please try again.")
            }
        }
        fetchPayments()
    }, [user.userId])

    async function deletePayment(paymentId) {
        try {
            const data = await api.del(`Payments/${paymentId}`)
            if (data.success) {
                alert("Xóa thành công!")
                const newPayments = payments.filter(
                    (payment) => payment.paymentId !== paymentId
                )
                setPayments(newPayments)
            } else {
                alert("Xóa thất bại!")
            }
        } catch (error) {
            console.error("Error during deletion:", error)
            alert("An error occurred during deletion. Please try again.")
        }
    }

    // Modal handlers
    const handleEditPaymentModal = (paymentId) => {
        setSelectedPaymentId(paymentId)
        setShowEditPaymentModal(true)
    }

    const handleCloseModal = () => {
        setShowEditPaymentModal(false)
        setShowAddPaymentModal(false)
    }

    // Render sidebar dynamically
    const renderSidebar = () => {
        if (roleId === 2) return <SideMenu />
        return <AdminSideMenu />
    }

    return (
        <Box sx={{ display: "flex" }}>
            {renderSidebar()}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid spacing={3}>
                    <Grid item xs={3} />
                    <Grid item xs={9}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                Manage Payment
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Payment ID</TableCell>
                                            <TableCell>Full Name</TableCell>
                                            <TableCell>
                                                Payment Method
                                            </TableCell>
                                            <TableCell>
                                                Payment Number
                                            </TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {payments.map((payment) => (
                                            <TableRow key={payment.paymentId}>
                                                <TableCell>
                                                    {payment.paymentId}
                                                </TableCell>
                                                <TableCell>
                                                    {payment.userName}
                                                </TableCell>
                                                <TableCell>
                                                    {payment.paymentMethodName}
                                                </TableCell>
                                                <TableCell>
                                                    {payment.paymentNumber}
                                                </TableCell>
                                                <TableCell>
                                                    <Stack
                                                        direction="row"
                                                        spacing={2}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() =>
                                                                deletePayment(
                                                                    payment.paymentId
                                                                )
                                                            }
                                                        >
                                                            Xóa
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            onClick={() =>
                                                                handleEditPaymentModal(
                                                                    payment.paymentId
                                                                )
                                                            }
                                                        >
                                                            Sửa
                                                        </Button>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button
                                variant="contained"
                                onClick={() => setShowAddPaymentModal(true)}
                                sx={{ mt: 3 }}
                            >
                                Add Payment
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Edit Payment Modal */}
                <Modal
                    open={showEditPaymentModal}
                    onClose={handleCloseModal}
                    aria-labelledby="detail-modal-title"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "80%",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            maxHeight: "90vh",
                            overflow: "auto",
                        }}
                    >
                        <Typography id="detail-modal-title" variant="h6">
                            Sửa phương thức thanh toán
                        </Typography>
                        <EditPayment id={selectedPaymentId} />
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseModal}
                            sx={{ mt: 2 }}
                        >
                            Đóng
                        </Button>
                    </Box>
                </Modal>

                {/* Add Payment Modal */}
                <Modal
                    open={showAddPaymentModal}
                    onClose={handleCloseModal}
                    aria-labelledby="add-payment-modal-title"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "80%",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            maxHeight: "90vh",
                            overflow: "auto",
                        }}
                    >
                        <Typography id="add-payment-modal-title" variant="h6">
                            Thêm phương thức thanh toán
                        </Typography>
                        <AddPayment />
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseModal}
                            sx={{ mt: 2 }}
                        >
                            Đóng
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}
