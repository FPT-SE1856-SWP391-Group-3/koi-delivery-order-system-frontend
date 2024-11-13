import { useState, useEffect } from "react"
import api from "../../../api/CallAPI"
import AddPaymentType from "./AddPaymentMethod"
import EditPaymentType from "./EditPaymentMethod"
import AddIcon from "@mui/icons-material/Add"
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Fab,
} from "@mui/material"
import Modal from "react-modal"
import AdminSideMenu from "../components/AdminSideMenu"

Modal.setAppElement("#root")

export default function ManagePaymentMethod() {
    const [paymentMethods, setPaymentMethods] = useState([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null)

    // Hàm tải danh sách Payment Methods
    const fetchPaymentMethods = async () => {
        try {
            const data = await api.get("PaymentMethods/")
            if (data.success) {
                setPaymentMethods(data.paymentMethods)
            } else {
                console.log("Không có phương thức thanh toán!")
            }
        } catch (error) {
            alert("An error has occurred. Please try again.")
        }
    }

    useEffect(() => {
        fetchPaymentMethods()
    }, [])

    // Mở modal xác nhận xóa
    const openDeleteModal = (paymentMethodId) => {
        setSelectedPaymentMethodId(paymentMethodId)
        setIsDeleteModalOpen(true)
    }

    // Đóng modal xác nhận xóa
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setSelectedPaymentMethodId(null)
    }

    // Xác nhận xóa Payment Method
    const confirmDeletePaymentMethod = async () => {
        try {
            const data = await api.del(
                "PaymentMethods/" + selectedPaymentMethodId
            )
            if (data.success) {
                alert("Xóa thành công!")
                const newPaymentMethods = paymentMethods.filter(
                    (paymentMethod) =>
                        paymentMethod.paymentMethodId !==
                        selectedPaymentMethodId
                )
                setPaymentMethods(newPaymentMethods)
            } else {
                alert("Xóa thất bại!")
            }
        } catch (error) {
            console.error("Error during deletion:", error)
            alert("An error occurred during deletion. Please try again.")
        }
        closeDeleteModal()
    }
    // Mở modal thêm Payment Method
    const openAddModal = () => {
        setIsAddModalOpen(true)
    }

    // Đóng modal thêm Payment Method
    const closeAddModal = () => {
        setIsAddModalOpen(false)
    }

    // Mở modal cập nhật Payment Method
    const openEditModal = (paymentMethodId) => {
        setSelectedPaymentMethodId(paymentMethodId)
        setIsEditModalOpen(true)
    }

    // Đóng modal cập nhật Payment Method
    const closeEditModal = () => {
        setIsEditModalOpen(false)
        setSelectedPaymentMethodId(null)
    }

    return (
        <Box display="flex">
            <AdminSideMenu />
            <Box flex={1} padding={3}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Payment Methods Management
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ height: 30 }}>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Payment Method
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Action
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paymentMethods.map((paymentType) => (
                                <TableRow key={paymentType.paymentMethodId}>
                                    <TableCell align="center">
                                        {paymentType.paymentMethodId}
                                    </TableCell>
                                    <TableCell align="center">
                                        {paymentType.paymentMethodName}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() =>
                                                openDeleteModal(
                                                    paymentType.paymentMethodId
                                                )
                                            }
                                            variant="contained"
                                            color="error"
                                            sx={{ marginRight: 1 }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                openEditModal(
                                                    paymentType.paymentMethodId
                                                )
                                            }
                                            variant="contained"
                                            color="primary"
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Floating Action Button for Adding Blog/News */}
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    onClick={openAddModal}
                >
                    <AddIcon />
                </Fab>
                {/* Modal thêm mới Payment Method */}
                <Modal
                    isOpen={isAddModalOpen}
                    onRequestClose={closeAddModal}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <button className="btn-close" onClick={closeAddModal}>
                        X
                    </button>
                    <AddPaymentType
                        onClose={closeAddModal}
                        onAddSuccess={fetchPaymentMethods}
                    />
                </Modal>

                {/* Modal cập nhật Payment Method */}
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={closeEditModal}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <button className="btn-close" onClick={closeEditModal}>
                        X
                    </button>
                    <EditPaymentType
                        id={selectedPaymentMethodId}
                        onClose={closeEditModal}
                        onUpdateSuccess={fetchPaymentMethods}
                    />
                </Modal>

                {/* Modal xác nhận xóa */}
                <Modal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={closeDeleteModal}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to delete this payment method?</p>
                    <div className="modal-buttons">
                        <button
                            className="confirm-btn"
                            onClick={confirmDeletePaymentMethod}
                        >
                            Yes
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={closeDeleteModal}
                        >
                            No
                        </button>
                    </div>
                </Modal>
            </Box>
        </Box>
    )
}
