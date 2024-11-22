import React, { useState, useEffect } from "react"
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Collapse,
    Button,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material"
import AdminSideMenu from "../components/AdminSideMenu"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import Modal from "react-modal"
import CreateOrderDocument from "./CreateOrderDocument"
import CreateTransportationReportDetails from "../report/CreateTransportationReportDetails"
import api from "../../../api/CallAPI" // Adjust path as per your project structure

const ManageDeliverOrder = () => {
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user"))
    )
    const [routes, setRoutes] = useState([])
    const [selectedRouteId, setSelectedRouteId] = useState("")
    const [orders, setOrders] = useState([])
    const [orderStatus, setOrderStatus] = useState([])
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("success")
    const [expandedOrderId, setExpandedOrderId] = useState(null)
    const [koiDetails, setKoiDetails] = useState([])
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [selectedKoiId, setSelectedKoiId] = useState(null)
    const [newKoiCondition, setNewKoiCondition] = useState("")
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [selectedOrderStatusId, setSelectedOrderStatusId] = useState(null)

    useEffect(() => {
        if (user?.userId) {
            fetchRoutes(user.userId)
            fetchOrderStatus()
            Modal.setAppElement("#root")
        }
    }, [user])
    useEffect(() => {
        // Automatically fetch orders for the first route when routes are loaded
        if (routes.length > 0) {
            const firstRouteId = routes[0].routeId
            setSelectedRouteId(firstRouteId) // Set the selected route ID to the first route
            fetchOrders(firstRouteId) // Fetch orders for the first route
        }
    }, [routes])
    const fetchOrders = async (routeId) => {
        try {
            const response = await api.get(`orders/route/${routeId}`)
            console.log("API Response for Orders:", response) // Debugging log

            if (response.success && Array.isArray(response.orderIds)) {
                setOrders(response.orderIds) // Directly set orders
            } else {
                setOrders([])
                setAlertMessage("No orders found for the selected route.")
                setAlertSeverity("info")
                setAlertOpen(true)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
            setAlertMessage("Error fetching orders for the selected route.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }
    const fetchOrderStatus = async () => {
        try {
            const response = await api.get("order-status/")
            if (response.success) {
                setOrderStatus(response.orderStatuses)
            } else {
                console.log("Error fetching order statuses.")
            }
        } catch (error) {
            setAlertMessage("An error occurred while fetching order statuses.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    const fetchKoiDetails = async (orderId) => {
        try {
            const response = await api.get(`order-details/order/${orderId}`)
            if (response.success) {
                const allKois = response.orderDetails.flatMap(
                    (detail) => detail.kois || []
                )
                setKoiDetails(allKois)
            } else {
                setKoiDetails([])
                console.log("No koi details found!")
            }
        } catch (error) {
            console.error("Error fetching koi details:", error)
        }
    }
    const openUpdateModal = (koiId, currentCondition) => {
        setSelectedKoiId(koiId)
        setNewKoiCondition(currentCondition)
        setIsUpdateModalOpen(true)
    }

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false)
        setSelectedKoiId(null)
        setNewKoiCondition("")
    }
    const updateKoiCondition = async () => {
        try {
            const response = await api.put(`kois/${selectedKoiId}`, {
                koiCondition: newKoiCondition,
            })
            if (response.success) {
                setAlertMessage("Update Koi Condition successfully!")
                setAlertSeverity("success")
                setAlertOpen(true)
                fetchKoiDetails(expandedOrderId)
                closeUpdateModal()
            } else {
                console.error("Failed to update koi condition.")
            }
        } catch (error) {
            console.error("Error updating koi condition:", error)
        }
    }
    const fetchRoutes = async (deliveryStaffId) => {
        try {
            const response = await api.get(
                `routes/delivery-staff/${deliveryStaffId}`
            )
            if (response.success && Array.isArray(response.route)) {
                setRoutes(response.route)
            } else {
                console.error("Failed to fetch routes or no routes available.")
            }
        } catch (error) {
            console.error("Error fetching routes:", error)
        }
    }
    const handleRouteChange = (event) => {
        const routeId = event.target.value
        setSelectedRouteId(routeId)
        fetchOrders(routeId) // Fetch orders for the selected route
    }
    const toggleExpandOrder = (orderId) => {
        const isExpanded = expandedOrderId === orderId
        setExpandedOrderId(isExpanded ? null : orderId)
        if (!isExpanded) {
            fetchKoiDetails(orderId)
        }
    }
    const handleAlertClose = () => {
        setAlertOpen(false)
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
        // Check status constraints
        if (nextStatusId < 7) {
            setAlertMessage(
                "You don't have permission to update to this status."
            )
            setAlertSeverity("warning")
            setAlertOpen(true)
            return
        }

        try {
            const response = await api.put(`orders/update-status/${orderId}`, {
                updateOrderStatusId: nextStatusId,
            })

            if (response.success) {
                setOrders((orders) =>
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
            fetchOrders(selectedRouteId)
        } catch (error) {
            setAlertMessage("An error occurred during status update.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    const cancelOrder = async (orderId) => {
        const orderToCancel = orders.find((order) => order.orderId === orderId)

        if (orderToCancel && orderToCancel.orderStatusId === 10) {
            setAlertMessage("Order is already finished.")
            setAlertSeverity("warning")
            setAlertOpen(true)
            return
        }

        const finalStatusId = orderStatus[orderStatus.length - 1]?.orderStatusId
        if (!finalStatusId) {
            setAlertMessage("Final status not found.")
            setAlertSeverity("error")
            setAlertOpen(true)
            return
        }
        try {
            await api.put(`orders/update-status/${orderId}`, {
                updateOrderStatusId: finalStatusId,
            })
            setOrders((orders) =>
                orders.map((order) =>
                    order.orderId === orderId
                        ? { ...order, orderStatusId: finalStatusId }
                        : order
                )
            )
            setAlertMessage("Order canceled successfully!")
            setAlertSeverity("success")
            setAlertOpen(true)
            fetchOrders(selectedRouteId)
        } catch (error) {
            setAlertMessage("An error occurred while canceling the order.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
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
    const handleVerifyPayment = async (orderId) => {
        try {
            api.post(`payments/cod/verify/${orderId}`)
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
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <AdminSideMenu />
            {/* Main Content */}
            <Box flex={1} padding={3}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Manage Deliver Orders
                </Typography>
                {/* Route Selector */}
                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="route-select-label">
                        Select Route
                    </InputLabel>
                    <Select
                        labelId="route-select-label"
                        value={selectedRouteId}
                        onChange={handleRouteChange}
                        label="Select Route"
                    >
                        {routes.length > 0 ? (
                            routes.map((route) => (
                                <MenuItem
                                    key={route.routeId}
                                    value={route.routeId}
                                >
                                    {`Route ${route.routeId}: ${route.routeAddresses
                                        .map((address) => address.city)
                                        .join(", ")}`}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem>No route available</MenuItem>
                        )}
                    </Select>
                </FormControl>

                {/* Orders Table */}
                {selectedRouteId && (
                    <TableContainer component={Paper} sx={{ mt: 4 }}>
                        <Table aria-label="Orders Table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Order Date</TableCell>
                                    <TableCell>Payment Status</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell>
                                        Estimate Delivery Date
                                    </TableCell>
                                    <TableCell>Order Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <React.Fragment key={order.orderId}>
                                            <TableRow>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            toggleExpandOrder(
                                                                order.orderId
                                                            )
                                                        }
                                                    >
                                                        {expandedOrderId ===
                                                        order.orderId ? (
                                                            <KeyboardArrowUp />
                                                        ) : (
                                                            <KeyboardArrowDown />
                                                        )}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    {order.orderId}
                                                </TableCell>
                                                <TableCell>
                                                    {order.customerName}
                                                </TableCell>
                                                <TableCell>
                                                    {order.orderDate}
                                                </TableCell>
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            display:
                                                                "inline-block",
                                                            padding: "4px 8px",
                                                            borderRadius: "4px",
                                                            color: order.isPayment
                                                                ? "green"
                                                                : "red",
                                                            backgroundColor:
                                                                order.isPayment
                                                                    ? "rgba(0, 200, 0, 0.1)"
                                                                    : "rgba(255, 0, 0, 0.1)",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {order.isPayment
                                                            ? " Paid "
                                                            : "Unpaid"}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {order.paymentMethod}
                                                </TableCell>
                                                <TableCell>
                                                    {order.estimateDeliveryDate}
                                                </TableCell>
                                                <TableCell>
                                                    {order.status}
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        displayEmpty
                                                        value=""
                                                        onChange={(event) => {
                                                            const action =
                                                                event.target
                                                                    .value
                                                            if (
                                                                action ===
                                                                "updateStatus"
                                                            ) {
                                                                updateOrderStatusByClick(
                                                                    order.orderId,
                                                                    order.orderStatusId
                                                                )
                                                            } else if (
                                                                action ===
                                                                "orderDocument"
                                                            ) {
                                                                openDocumentModal(
                                                                    order.orderId,
                                                                    order.orderStatusId
                                                                )
                                                            } else if (
                                                                action ===
                                                                "report"
                                                            ) {
                                                                openReportModal(
                                                                    order.orderId
                                                                )
                                                            } else if (
                                                                action ===
                                                                "cancel"
                                                            ) {
                                                                cancelOrder(
                                                                    order.orderId
                                                                )
                                                            }
                                                        }}
                                                        fullWidth
                                                    >
                                                        <MenuItem
                                                            value=""
                                                            disabled
                                                        >
                                                            Select Action
                                                        </MenuItem>
                                                        <MenuItem value="updateStatus">
                                                            Update Status
                                                        </MenuItem>
                                                        {order.orderStatusId ==
                                                            4 ||
                                                        order.orderStatusId ==
                                                            6 ? (
                                                            <MenuItem value="orderDocument">
                                                                Update Document
                                                            </MenuItem>
                                                        ) : (
                                                            <MenuItem disabled>
                                                                Order Document
                                                            </MenuItem>
                                                        )}
                                                        <MenuItem value="report">
                                                            Transportation
                                                            Report
                                                        </MenuItem>
                                                        <MenuItem value="cancel">
                                                            Cancel Order
                                                        </MenuItem>
                                                        {order.paymentStatusId !=
                                                            2 &&
                                                        order.orderStatusId ==
                                                            9 &&
                                                        order.paymentMethodId ==
                                                            1 ? (
                                                            <MenuItem
                                                                onClick={() =>
                                                                    handleVerifyPayment(
                                                                        order.orderId
                                                                    )
                                                                }
                                                            >
                                                                Verify Payment
                                                            </MenuItem>
                                                        ) : (
                                                            <MenuItem disabled>
                                                                Verify Payment
                                                            </MenuItem>
                                                        )}
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                            {expandedOrderId ===
                                                order.orderId && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={12}
                                                        style={{ padding: 0 }}
                                                    >
                                                        <Collapse
                                                            in
                                                            timeout="auto"
                                                            unmountOnExit
                                                        >
                                                            <Box margin={2}>
                                                                <Typography
                                                                    variant="h6"
                                                                    gutterBottom
                                                                    component="div"
                                                                >
                                                                    Order
                                                                    Details
                                                                </Typography>
                                                                <Table
                                                                    size="small"
                                                                    aria-label="order details"
                                                                >
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                Pickup
                                                                                Address
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                Shipping
                                                                                Address
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                Distance
                                                                            </TableCell>

                                                                            <TableCell>
                                                                                Total
                                                                                Price
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                {
                                                                                    order.startAddressLine
                                                                                }
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {
                                                                                    order.endAddressLine
                                                                                }
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {Math.round(
                                                                                    order.distance /
                                                                                        1000
                                                                                )}
                                                                                km
                                                                            </TableCell>

                                                                            <TableCell>
                                                                                {
                                                                                    order.totalPrice
                                                                                }

                                                                                đ
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                                <Box
                                                                    marginTop={
                                                                        2
                                                                    }
                                                                >
                                                                    <Typography
                                                                        variant="h6"
                                                                        gutterBottom
                                                                    >
                                                                        Koi
                                                                        Details
                                                                    </Typography>
                                                                    <Table size="small">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Koi
                                                                                    ID
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    Name
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    Weight
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    Condition
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    Price
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    Action
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {koiDetails.length >
                                                                            0 ? (
                                                                                koiDetails.map(
                                                                                    (
                                                                                        koi
                                                                                    ) => (
                                                                                        <TableRow
                                                                                            key={
                                                                                                koi.koiId
                                                                                            }
                                                                                        >
                                                                                            <TableCell>
                                                                                                {
                                                                                                    koi.koiId
                                                                                                }
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                {
                                                                                                    koi.koiName
                                                                                                }
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                {
                                                                                                    koi.weight
                                                                                                }
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                {
                                                                                                    koi.koiCondition
                                                                                                }
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                {koi.price ||
                                                                                                    "N/A"}
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Button
                                                                                                    variant="contained"
                                                                                                    size="small"
                                                                                                    onClick={() =>
                                                                                                        openUpdateModal(
                                                                                                            koi.koiId,
                                                                                                            koi.koiCondition
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    Update
                                                                                                </Button>
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    )
                                                                                )
                                                                            ) : (
                                                                                <TableRow>
                                                                                    <TableCell
                                                                                        colSpan={
                                                                                            12
                                                                                        }
                                                                                        align="center"
                                                                                    >
                                                                                        No
                                                                                        Koi
                                                                                        Details
                                                                                        Available
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
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={12} align="center">
                                            No orders available for this route.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

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
                <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
                    <DialogTitle>Update Koi Condition</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Condition"
                            type="text"
                            fullWidth
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
            </Box>
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
                        setAlertMessage={setAlertMessage}
                        setAlertSeverity={setAlertSeverity}
                        setAlertOpen={setAlertOpen}
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
export default ManageDeliverOrder
