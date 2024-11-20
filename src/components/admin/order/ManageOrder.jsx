import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import AdminSideMenu from "../components/AdminSideMenu"
import RefreshIcon from "@mui/icons-material/Refresh"
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Typography,
    Collapse,
    Snackbar,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material"
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material"
import Modal from "react-modal"
import api from "../../../api/CallAPI"
import CreateOrderDocument from "./CreateOrderDocument"
import CreateTransportationReportDetails from "../report/CreateTransportationReportDetails"

function OrderRow({
    row,
    orderStatus,
    updateOrderStatusBySelect,
    updateOrderStatusByClick,
    openDocumentModal,
    openReportModal,
    cancelOrder,
    handleVerifyPayment,
}) {
    const [open, setOpen] = useState(false)
    const [koiDetails, setKoiDetails] = useState([])
    const [selectedKoiId, setSelectedKoiId] = useState(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [selectedOrderDetailId, setSelectedOrderDetailId] = useState(null)
    const [newKoiCondition, setNewKoiCondition] = useState("")
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user"))
    )

    const fetchKoiDetails = async (orderId) => {
        try {
            const data = await api.get(
                `OrderDetails/OrderDetailsByOrderId/${orderId}`
            )
            if (data.success) {
                setKoiDetails(data.orderDetails || [])
            } else {
                console.log("No koi details found!")
            }
        } catch (error) {
            console.error("Error fetching koi details:", error)
        }
    }

    const handleExpandClick = () => {
        setOpen(!open)
        if (!open && koiDetails.length === 0) {
            fetchKoiDetails(row.orderId)
        }
    }

    const openUpdateModal = (koiId, currentCondition) => {
        setSelectedKoiId(koiId) // Set koi ID for update
        setNewKoiCondition(currentCondition) // Prefill with current condition
        setIsUpdateModalOpen(true)
    }

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false)
        setSelectedOrderDetailId(null)
        setNewKoiCondition("")
    }

    const updateKoiCondition = async () => {
        try {
            const response = await api.put(`Kois/${selectedKoiId}`, {
                koiCondition: newKoiCondition,
            })
            if (response.success) {
                fetchKoiDetails(row.orderId)
                closeUpdateModal()
            } else {
                console.error("Failed to update koi condition.")
            }
        } catch (error) {
            console.error("Error updating koi condition:", error)
        }
    }

    // Function to calculate estimated delivery date
    const calculateEstimatedDeliveryDate = (orderDate, distance) => {
        const estimatedDays = Math.ceil(distance / 200000) // Calculate days needed
        return dayjs(orderDate).add(estimatedDays, "day").format("YYYY-MM-DD") // Add days to orderDate
    }

    return (
        row != null &&
        ((user.roleId === 3 && row.orderStatusId <= 7) ||
            (user.roleId === 4 && row.orderStatusId >= 7) ||
            user.roleId === 5) && (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <IconButton size="small" onClick={handleExpandClick}>
                            {open ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                    </TableCell>
                    <TableCell>{row.orderId}</TableCell>
                    <TableCell>{row.customerId}</TableCell>
                    <TableCell>{row.orderDate}</TableCell>
                    <TableCell>
                        {row.paymentHistoryId == null
                            ? "False"
                            : row.paymentHistory.paymentStatusId == 2
                              ? "True"
                              : "False"}
                    </TableCell>
                    <TableCell>
                        {row.orderStatus != null
                            ? row.orderStatus.orderStatusName
                            : ""}
                    </TableCell>
                    <TableCell>
                        {calculateEstimatedDeliveryDate(
                            row.orderDate,
                            row.distance
                        )}
                    </TableCell>{" "}
                    {/* Display Estimated Delivery Date */}
                    <TableCell>
                        <select
                            onChange={(event) =>
                                updateOrderStatusBySelect(
                                    event,
                                    row.orderId,
                                    row.orderStatusId
                                )
                            }
                            value={row == null ? "" : row.orderStatusId}
                        >
                            {orderStatus.map((status) => (
                                <option
                                    key={status.orderStatusId}
                                    value={status.orderStatusId}
                                >
                                    {status.orderStatusName}
                                </option>
                            ))}
                        </select>
                    </TableCell>
                    <TableCell>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Button
                                onClick={() =>
                                    updateOrderStatusByClick(
                                        row.orderId,
                                        row.orderStatusId
                                    )
                                }
                            >
                                Update Status
                            </Button>

                            {row.orderStatus.orderStatusId == 4 ||
                            row.orderStatus.orderStatusId == 6 ? (
                                <Button
                                    onClick={() =>
                                        openDocumentModal(
                                            row.orderId,
                                            row.orderStatusId
                                        )
                                    }
                                >
                                    Update Document
                                </Button>
                            ) : (
                                <Button disabled>Update Document</Button>
                            )}
                            <Button
                                onClick={() => openReportModal(row.orderId)}
                            >
                                Transportation Report
                            </Button>
                            <Button
                                onClick={() => cancelOrder(row.orderId)}
                                color="error"
                            >
                                Cancel
                            </Button>
                            {user.roleId >= 4 &&
                            row.paymentHistory?.paymentStatusId != 2 &&
                            row.orderStatus.orderStatusId == 9 ? (
                                <Button
                                    onClick={() =>
                                        handleVerifyPayment(row.orderId)
                                    }
                                >
                                    Verify Payment
                                </Button>
                            ) : (
                                <Button disabled>Verify Payment</Button>
                            )}
                        </Box>
                    </TableCell>
                    <TableCell>{row.deliveryStaffId}</TableCell>
                </TableRow>

                {/* Order Details */}
                <TableRow>
                    <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={12}
                    >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={2}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                >
                                    Order Details
                                </Typography>
                                <Table size="small" aria-label="order details">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Pickup Address
                                            </TableCell>
                                            <TableCell>
                                                Shipping Address
                                            </TableCell>
                                            <TableCell>Distance</TableCell>

                                            <TableCell>Total Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                {row.startAddress
                                                    ?.addressLine || ""}
                                            </TableCell>
                                            <TableCell>
                                                {row.endAddress?.addressLine ||
                                                    ""}
                                            </TableCell>
                                            <TableCell>
                                                {row.distance}
                                            </TableCell>

                                            <TableCell>
                                                {row.totalPrice}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                                <Box marginTop={2}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                    >
                                        Koi Details
                                    </Typography>
                                    <Table
                                        size="small"
                                        aria-label="koi details"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Koi ID</TableCell>
                                                <TableCell>Koi Name</TableCell>
                                                <TableCell>
                                                    Weight (kg)
                                                </TableCell>
                                                <TableCell>
                                                    Koi Condition
                                                </TableCell>
                                                <TableCell>Price ($)</TableCell>
                                                <TableCell align="center">
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Array.isArray(koiDetails) &&
                                            koiDetails.length > 0 ? (
                                                koiDetails.map((koiDetail) => (
                                                    <TableRow
                                                        key={
                                                            koiDetail.orderDetailId
                                                        }
                                                    >
                                                        <TableCell>
                                                            {
                                                                koiDetail.koi
                                                                    .koiId
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                koiDetail.koi
                                                                    .koiName
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                koiDetail.koi
                                                                    .weight
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                koiDetail.koi
                                                                    .koiCondition
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                koiDetail.koi
                                                                    .price
                                                            }
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                onClick={() =>
                                                                    openUpdateModal(
                                                                        koiDetail
                                                                            .koi
                                                                            .koiId,
                                                                        koiDetail
                                                                            .koi
                                                                            .koiCondition
                                                                    )
                                                                }
                                                            >
                                                                Update Condition
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={5}
                                                        align="center"
                                                    >
                                                        No Koi Details Available
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
                {/* Update Condition Modal */}
                <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
                    <DialogTitle>Update Koi Condition</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a new condition for this koi:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Koi Condition"
                            fullWidth
                            variant="outlined"
                            value={newKoiCondition}
                            onChange={(e) => setNewKoiCondition(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeUpdateModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={updateKoiCondition} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    )
}
OrderRow.propTypes = {
    row: PropTypes.object.isRequired,
    orderStatus: PropTypes.array.isRequired,
    updateOrderStatusBySelect: PropTypes.func.isRequired,
    updateOrderStatusByClick: PropTypes.func.isRequired,
    openDocumentModal: PropTypes.func.isRequired,
    openReportModal: PropTypes.func.isRequired,
    cancelOrder: PropTypes.func.isRequired,
}

export default function ManageOrder() {
    const [order, setOrder] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([null])
    const [orderStatus, setOrderStatus] = useState([])
    const [dateRange, setDateRange] = useState([null, null])
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user"))
    )
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [selectedOrderStatusId, setSelectedOrderStatusId] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("success")

    useEffect(() => {
        fetchOrders()
        fetchOrderStatus()
    }, [])

    useEffect(() => {
        if (dateRange[0] && dateRange[1]) {
            const filtered = order.filter((o) => {
                const orderDate = dayjs(o.orderDate)
                return (
                    orderDate.isAfter(dayjs(dateRange[0]).subtract(1, "day")) &&
                    orderDate.isBefore(dayjs(dateRange[1]).add(1, "day"))
                )
            })
            setFilteredOrders(filtered)
        } else {
            setFilteredOrders(order)
        }
    }, [dateRange, order])

    const fetchOrders = async () => {
        try {
            const endpoint =
                user.roleId === 4 ? `Orders/${user.userId}` : "Orders/"
            const data = await api.get(endpoint)
            if (data.success) {
                setOrder(data.order)
                setFilteredOrders(data.order)
                console.log(order)
            } else {
                console.log("No orders found!")
            }
        } catch (error) {
            setAlertMessage("An error occurred while fetching orders.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    const fetchOrderStatus = async () => {
        try {
            const data = await api.get("OrderStatus/")
            if (data.success) {
                setOrderStatus(data.orderStatuses)
            } else {
                console.log("Error fetching order statuses.")
            }
        } catch (error) {
            setAlertMessage("An error occurred while fetching order statuses.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    const updateOrderStatusBySelect = async (
        event,
        orderId,
        currentStatusId
    ) => {
        const selectedStatusId = parseInt(event.target.value)

        // Check user role and status constraints
        if (
            (user.roleId === 3 && selectedStatusId > 7) ||
            (user.roleId === 4 && selectedStatusId < 7)
        ) {
            setAlertMessage(
                "You don't have permission to update to this status."
            )
            setAlertSeverity("warning")
            setAlertOpen(true)
            return
        }
        if (selectedStatusId <= currentStatusId) {
            setAlertMessage("Please select the next status only.")
            setAlertSeverity("warning")
            setAlertOpen(true)
            return
        }
        try {
            const response = await api.put(`Orders/update-status/${orderId}`, {
                updateOrderStatusId: selectedStatusId,
            })

            if (response.success) {
                // Refresh the orders list
                await fetchOrders()

                setAlertMessage("Order status updated successfully!")
                setAlertSeverity("success")
                setAlertOpen(true)
            } else {
                if (response.code === "error-payment") {
                    setAlertMessage("Payment is not completed yet.")
                } else if (response.code === "error-document") {
                    setAlertMessage("Document is not uploaded yet.")
                } else {
                    setAlertMessage("Failed to update order status.")
                }
                setAlertSeverity("warning")
                setAlertOpen(true)
            }
        } catch (error) {
            setAlertMessage("An error occurred during status update.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    const updateOrderStatusByClick = async (orderId, currentStatusId) => {
        const currentIndex = orderStatus.findIndex(
            (status) => status.orderStatusId === currentStatusId
        )
        if (currentIndex === -1 || currentIndex === orderStatus.length - 2) {
            setAlertMessage("Order is already complete or status not found.")
            setAlertSeverity("warning")
            setAlertOpen(true)
            return
        }
        const nextStatusId = orderStatus[currentIndex + 1].orderStatusId

        // Check user role and status constraints
        if (
            (user.roleId === 3 && nextStatusId > 7) ||
            (user.roleId === 4 && nextStatusId < 7)
        ) {
            setAlertMessage(
                "You don't have permission to update to this status."
            )
            setAlertSeverity("warning")
            setAlertOpen(true)
            return
        }

        try {
            const response = await api.put(`Orders/update-status/${orderId}`, {
                updateOrderStatusId: nextStatusId,
            })

            if (response.success) {
                setOrder((orders) =>
                    orders.map((order) =>
                        order.orderId === orderId
                            ? { ...order, orderStatusId: nextStatusId }
                            : order
                    )
                )
            } else if (response.success === false) {
                if (response.code == "error-payment") {
                    setAlertMessage("Payment is not completed yet.")
                    setAlertSeverity("warning")
                    setAlertOpen(true)
                    return
                } else if (response.code == "error-document") {
                    setAlertMessage("Document is not uploaded yet.")
                    setAlertSeverity("warning")
                    setAlertOpen(true)
                    return
                }
            }
            setAlertMessage("Order status updated successfully!")
            setAlertSeverity("success")
            setAlertOpen(true)
            fetchOrders() // Fetch updated orders without page reload
        } catch (error) {
            setAlertMessage("An error occurred during status update.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    const cancelOrder = async (orderId) => {
        const finalStatusId = orderStatus[orderStatus.length - 1]?.orderStatusId
        if (!finalStatusId) {
            setAlertMessage("Final status not found.")
            setAlertSeverity("error")
            setAlertOpen(true)
            return
        }
        try {
            await api.put(`Orders/update-status/${orderId}`, {
                updateOrderStatusId: finalStatusId,
            })
            setOrder((orders) =>
                orders.map((order) =>
                    order.orderId === orderId
                        ? { ...order, orderStatusId: finalStatusId }
                        : order
                )
            )
            setAlertMessage("Order canceled successfully!")
            setAlertSeverity("success")
            setAlertOpen(true)
        } catch (error) {
            setAlertMessage("An error occurred while canceling the order.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    const openDocumentModal = (orderId, orderStatusId) => {
        setSelectedOrderId(orderId)
        setSelectedOrderStatusId(orderStatusId)
        setIsDocumentModalOpen(true)
    }

    const closeDocumentModal = () => {
        setIsDocumentModalOpen(false)
        setSelectedOrderId(null)
        setSelectedOrderStatusId(null)
    }

    const openReportModal = (orderId) => {
        setSelectedOrderId(orderId)
        setIsReportModalOpen(true)
    }

    const closeReportModal = () => {
        setIsReportModalOpen(false)
        setSelectedOrderId(null)
    }
    const handleRefresh = () => {
        fetchOrders()
    }

    const handleVerifyPayment = async (orderId) => {
        try {
            api.post(`Payments/cod/verify/${orderId}`)
                .then((data) => {
                    if (data.success) {
                        setAlertMessage("Verify payment successfully!")
                        setAlertSeverity("success")
                        setAlertOpen(true)
                    }
                })
                .catch((error) => {
                    console.error("Error verifying payment:", error)
                    setAlertMessage("Failed to verify payment.")
                    setAlertSeverity("error")
                    setAlertOpen(true)
                })
        } catch (error) {
            console.error("Error verifying payment:", error)
            setAlertMessage("Failed to verify payment.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    return (
        <Box display="flex">
            {/* Admin Side Menu */}
            <AdminSideMenu />
            {/* <ToastContainer containerId="Order"/> */}
            {/* Main Table Area */}
            <Box width="100%" padding={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom={2}
                    >
                        <Box display="flex" gap={2} marginBottom={2}>
                            <DatePicker
                                label="Start Date"
                                value={dateRange[0]}
                                onChange={(newValue) =>
                                    setDateRange([newValue, dateRange[1]])
                                }
                            />
                            <DatePicker
                                label="End Date"
                                value={dateRange[1]}
                                onChange={(newValue) =>
                                    setDateRange([dateRange[0], newValue])
                                }
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleRefresh}
                            sx={{ marginLeft: "auto" }}
                        >
                            <RefreshIcon />
                        </Button>
                    </Box>
                </LocalizationProvider>

                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>
                                    <Typography
                                        fontWeight={600}
                                        align="center"
                                        width={50}
                                    >
                                        Order ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Customer ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        fontWeight={600}
                                        align="center"
                                        width={100}
                                    >
                                        Order Date
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Is Payment
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Estimated Delivery Date
                                    </Typography>
                                </TableCell>{" "}
                                {/* Add Estimated Delivery Date header */}
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Edit Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Action
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} align="center">
                                        Delivering Staff
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredOrders?.map((order) =>
                                order ? ( // Only render if order is not null
                                    <OrderRow
                                        key={order.orderId}
                                        row={order}
                                        orderStatus={orderStatus}
                                        updateOrderStatusBySelect={
                                            updateOrderStatusBySelect
                                        }
                                        updateOrderStatusByClick={
                                            updateOrderStatusByClick
                                        }
                                        openDocumentModal={openDocumentModal}
                                        openReportModal={openReportModal}
                                        cancelOrder={cancelOrder}
                                        handleVerifyPayment={handleVerifyPayment}
                                    />
                                ) : null
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alertSeverity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Modal
                isOpen={isDocumentModalOpen}
                onRequestClose={closeDocumentModal}
                style={{
                    content: {
                        width: "500px",
                        maxHeight: "80vh",
                        margin: "auto",
                        padding: "15px",
                        borderRadius: "8px",
                        overflow: "auto",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            >
                <Button
                    onClick={closeDocumentModal}
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: "10px" }} // Optional: Adds space below the button
                >
                    Close
                </Button>

                {selectedOrderId && selectedOrderStatusId && (
                    <CreateOrderDocument
                        orderId={selectedOrderId}
                        orderStatusId={selectedOrderStatusId}
                        onClose={closeDocumentModal}
                    />
                )}
            </Modal>

            <Modal
                isOpen={isReportModalOpen}
                onRequestClose={closeReportModal}
                style={{
                    content: {
                        width: "500px",
                        maxHeight: "80vh",
                        margin: "auto",
                        padding: "15px",
                        borderRadius: "8px",
                        overflow: "auto",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            >
                <Button
                    onClick={closeReportModal}
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: "10px" }} // Add spacing below the button
                >
                    Close
                </Button>

                {selectedOrderId && (
                    <CreateTransportationReportDetails
                        orderId={selectedOrderId}
                        onClose={closeReportModal}
                    />
                )}
            </Modal>
        </Box>
    )
}
