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
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"

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
                   UserToast("error", "No payment found.")
                }
            } catch {
                UserToast("error", "An error occurred while fetching payments.")
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
                    UserToast("success", "Delete successful!")
                    const newPayments = payments.filter(
                        (payment) => payment.paymentId !== paymentId
                    )
                    setPayments(newPayments)
                } else {
                    UserToast("error", "Delete failed!")
                }
            })
        } catch (error) {
            console.error("Error during deletion:", error)
           UserToast("error", "An error occurred while deleting the payment.")
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
            <ToastContainer />
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
                                            <TableCell>
                                                Payment ID
                                            </TableCell>
                                            <TableCell>Full Name</TableCell>
                                            <TableCell>
                                                Payment Method
                                            </TableCell>
                                            <TableCell>Payment Number</TableCell>
                                            <TableCell>Action</TableCell>
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
                                                                Delete
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                onClick={() =>
                                                                    handleEditPaymentModal(
                                                                        payment.paymentId
                                                                    )
                                                                }
                                                            >
                                                                Update
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
                                                                Order Detail
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
                                                                    Close
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
                                                                Add Payment
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
                                                                    Close
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
                                Add Payment
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </UserSideNav>
    )
}
