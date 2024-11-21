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
    Tooltip,
} from "@mui/material"
import AdminSideMenu from "../components/AdminSideMenu"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
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

    useEffect(() => {
        if (user?.userId) {
            fetchRoutes(user.userId)
            fetchOrderStatus()
        }
    }, [user])

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
                console.error("Error fetching order statuses.")
            }
        } catch (error) {
            console.error("Error fetching order statuses:", error)
        }
    }
    const fetchKoiDetails = async (orderId) => {
        try {
            const response = await api.get(
                `order-details/order/${orderId}`
            )
            if (response.success) {
                setKoiDetails(response.orderDetails || [])
            } else {
                console.log("No koi details found!")
            }
        } catch (error) {
            console.error("Error fetching koi details:", error)
        }
    }
    const updateKoiCondition = async () => {
        try {
            const response = await api.put(`kois/${selectedKoiId}`, {
                koiCondition: newKoiCondition,
            })
            if (response.success) {
                fetchKoiDetails(expandedOrderId)
                setIsUpdateModalOpen(false)
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
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId))
    }

    const handleAlertClose = () => {
        setAlertOpen(false)
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
                        {routes.map((route) => (
                            <MenuItem key={route.routeId} value={route.routeId}>
                                {`Route ${route.routeId}: ${route.routeAddresses
                                    .map((address) => address.city)
                                    .join(", ")}`}
                            </MenuItem>
                        ))}
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
                                    <TableCell>Is Payment</TableCell>
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
                                                    {order.isPayment == true
                                                        ? "Paid"
                                                        : "Unpaid"}
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
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
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
                <Dialog
                    open={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                >
                    <DialogTitle>Update Koi Condition</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="New Condition"
                            value={newKoiCondition}
                            onChange={(e) => setNewKoiCondition(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setIsUpdateModalOpen(false)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button onClick={updateKoiCondition} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}
export default ManageDeliverOrder
