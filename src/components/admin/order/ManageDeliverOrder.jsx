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
import api from "../../../api/CallAPI" // Adjust path as per your project structure

const ManageDeliverOrder = () => {
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user"))
    )
    const [routes, setRoutes] = useState([])
    const [selectedRouteId, setSelectedRouteId] = useState("")
    const [orders, setOrders] = useState([])
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
    const fetchRoutes = async (deliveryStaffId) => {
        try {
            const response = await api.get(
                `routes-controllers/DeliveryStaffId/${deliveryStaffId}`
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
    const fetchOrders = async (routeId) => {
        try {
            const response = await api.get(`orders/orderByRouteId/${routeId}`)
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

    const fetchKoiDetails = async (orderId) => {
        try {
            const response = await api.get(
                `order-details/OrderDetailsByOrderId/${orderId}`
            )
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
                                                <TableCell></TableCell>
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
                                                                                {
                                                                                    order.distance
                                                                                }
                                                                            </TableCell>

                                                                            <TableCell>
                                                                                {
                                                                                    order.totalPrice
                                                                                }
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
        </Box>
    )
}
export default ManageDeliverOrder
