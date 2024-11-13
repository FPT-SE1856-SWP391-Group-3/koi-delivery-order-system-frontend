import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import ComponentPath from "routes/ComponentPath"
import UserSideNav from "../UserSideNav"
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
import { ModalFooter } from "react-bootstrap"

export default function UserPayment() {
    const [payments, setPayments] = useState([])
    const navigate = useNavigate()
    const id = localStorage.getItem("userId")

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await api.get("Payments/" + id)
                if (data.success) {
                    setPayments(data.payment)
                    console.log(data.payment)
                } else {
                    alert("Không có phương thức thanh toán!")
                }
            } catch {
                alert("An error has occurred. Please try again.")
            }
        }
        fetchPayments()
    }, [id])
    const [showEditPaymentModal, setShowEditPaymentModal] = useState(false)
    const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
    const [selectedPaymentId, setSelectedPaymentId] = useState(null)

    async function deletePayment(paymentId) {
        try {
            api.del("Payments/" + paymentId).then((data) => {
                if (data.success) {
                    alert("Xóa thành công!")
                    const newPayments = payments.filter(
                        (payment) => payment.paymentId !== paymentId
                    )
                    setPayments(newPayments)
                } else {
                    alert("Xóa thất bại!")
                }
            })
        } catch (error) {
            console.error("Error during deletion:", error)
            alert("An error occurred during deletion. Please try again.")
        }
    }

    // Modal
    const handleEditPaymentModal = (paymentId) => {
        setSelectedPaymentId(paymentId)
        setShowEditPaymentModal(true)
    }

    const handleCloseModal = () => {
        setShowEditPaymentModal(false)
        setShowAddPaymentModal(false)
    }

    return (
        <UserSideNav>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid spacing={3}>
                    <Grid item xs={3} />
                    <Grid item xs={9}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                Quản lý phương thức thanh toán
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Mã phương thức thanh toán
                                            </TableCell>
                                            <TableCell>Chủ thẻ</TableCell>
                                            <TableCell>
                                                Phương thức thanh toán
                                            </TableCell>
                                            <TableCell>Số thẻ</TableCell>
                                            <TableCell>Thao tác</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {payments.map((payment) => (
                                            <>
                                                <TableRow
                                                    key={payment.paymentId}
                                                >
                                                    <TableCell>
                                                        {payment.paymentId}
                                                    </TableCell>
                                                    <TableCell>
                                                        {payment.userName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            payment.paymentMethodName
                                                        }
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
                                                <div>
                                                    <Modal
                                                        open={
                                                            showEditPaymentModal
                                                        }
                                                        onClose={
                                                            handleCloseModal
                                                        }
                                                        aria-labelledby="detail-modal-title"
                                                    >
                                                        <Box
                                                            sx={{
                                                                position:
                                                                    "absolute",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform:
                                                                    "translate(-50%, -50%)",
                                                                width: "80%",
                                                                bgcolor:
                                                                    "background.paper",
                                                                boxShadow: 24,
                                                                p: 4,
                                                                maxHeight:
                                                                    "90vh",
                                                                overflow:
                                                                    "auto",
                                                            }}
                                                        >
                                                            <h2 id="detail-modal-title">
                                                                Chi tiết đơn
                                                                hàng
                                                            </h2>
                                                            <EditPayment
                                                                id={
                                                                    selectedPaymentId
                                                                }
                                                            />
                                                            <ModalFooter>
                                                                <Button
                                                                    variant="contained"
                                                                    color="error"
                                                                    onClick={
                                                                        handleCloseModal
                                                                    }
                                                                >
                                                                    Đóng
                                                                </Button>
                                                            </ModalFooter>
                                                        </Box>
                                                    </Modal>

                                                    <Modal
                                                        open={
                                                            showAddPaymentModal
                                                        }
                                                        onClose={
                                                            handleCloseModal
                                                        }
                                                        aria-labelledby="add-payment-modal-title"
                                                    >
                                                        <Box
                                                            sx={{
                                                                position:
                                                                    "absolute",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform:
                                                                    "translate(-50%, -50%)",
                                                                width: "80%",
                                                                bgcolor:
                                                                    "background.paper",
                                                                boxShadow: 24,
                                                                p: 4,
                                                                maxHeight:
                                                                    "90vh",
                                                                overflow:
                                                                    "auto",
                                                            }}
                                                        >
                                                            <h2 id="add-payment-modal-title">
                                                                Thêm Thanh Toán
                                                            </h2>
                                                            <AddPayment />
                                                            <ModalFooter>
                                                                <Button
                                                                    variant="contained"
                                                                    color="error"
                                                                    onClick={
                                                                        handleCloseModal
                                                                    }
                                                                >
                                                                    Đóng
                                                                </Button>
                                                            </ModalFooter>
                                                        </Box>
                                                    </Modal>
                                                </div>
                                            </>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button
                                variant="contained"
                                onClick={() => setShowAddPaymentModal(true)}
                                sx={{ mt: 3 }}
                            >
                                Thêm phương thức thanh toán
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </UserSideNav>
    )
}
