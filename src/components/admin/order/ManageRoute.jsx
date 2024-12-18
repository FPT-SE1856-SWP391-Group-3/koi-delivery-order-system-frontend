import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import AdminSideMenu from "../components/AdminSideMenu"
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
    Modal,
    Alert,
    Snackbar,
    IconButton,
    Typography,
    Collapse,
} from "@mui/material"
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material"
import api from "../../../api/CallAPI"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

function OrderRow({
    row,
    setAlertOpen,
    setAlertMessage,
    setAlertSeverity,
    fetchOrders,
}) {
    const [open, setOpen] = useState(false)
    const [koiDetails, setKoiDetails] = useState([])
    const [routeModalOpen, setRouteModalOpen] = useState(false)
    const [matchingRoutes, setMatchingRoutes] = useState([])
    const [error, setError] = useState(null) // State for error handling

    const user = JSON.parse(localStorage.getItem("user"))

    const fetchKoiDetails = async (orderId) => {
        try {
            const response = await api.get(`order-details/order/${orderId}`)
            if (response.success && Array.isArray(response.orderDetails)) {
                const kois = response.orderDetails.flatMap(
                    (detail) => detail.kois
                )
                setKoiDetails(kois)
            } else {
                console.log("No koi details found!")
                setKoiDetails([])
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

    // Fetch matching routes and open the modal
    const handleAddRouteClick = async () => {
        try {
            const response = await api.get(
                `routes/matching-route/${row.orderId}`
            )
            if (response.success && Array.isArray(response.matchingRoutes)) {
                setMatchingRoutes(response.matchingRoutes)
                setError(null)
            } else {
                setMatchingRoutes([])
                setError("No Route Match!")
            }
            setRouteModalOpen(true)
        } catch (error) {
            console.error("Error fetching matching routes:", error)
            setMatchingRoutes([])
            setError("An error occurred while fetching routes.")
            setRouteModalOpen(true)
        }
    }

    // Function to add the order to the selected route
    const handleAddOrderToRoute = async (routeId) => {
        try {
            // Check if routeId is valid
            if (!routeId) {
                throw new Error("Invalid routeId")
            }

            const payload = { routeId, orderId: row.orderId }
            console.log("Payload:", payload) // Add this to verify the payload

            const response = await api.put("routes/add-order", payload)

            // Check if response is valid
            if (!response || !response.success) {
                throw new Error("Invalid response")
            }

            if (response.success) {
                setRouteModalOpen(false) // Close modal after successful addition
                setAlertMessage("Order added to route successfully!")
                setAlertSeverity("success")
                setAlertOpen(true)
                fetchOrders()
            } else {
                setAlertMessage("Failed to add order to route!")
                setAlertSeverity("error")
                setAlertOpen(true)
            }
        } catch (error) {
            UserToast("error", "Error! Please try again.")
            console.error("Error adding order to route:", error)
            setAlertMessage("Error! Please try again.")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    return (
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
                <TableCell align="center">{row.orderId}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.orderDate}</TableCell>
                <TableCell>
                    <Box
                        sx={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            color: row.isPayment ? "green" : "red",
                            backgroundColor: row.isPayment
                                ? "rgba(0, 200, 0, 0.1)"
                                : "rgba(255, 0, 0, 0.1)",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        {row.isPayment ? "Paid" : "Unpaid"}
                    </Box>
                </TableCell>
                <TableCell>{row.status ? row.status : ""}</TableCell>
                <TableCell>{row.deliveryStaffName}</TableCell>
                <TableCell>
                    <Button variant="contained" onClick={handleAddRouteClick}>
                        Add Route
                    </Button>
                </TableCell>
            </TableRow>

            {/* Modal for Matching Routes */}
            <Modal
                open={routeModalOpen}
                onClose={() => setRouteModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 900,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Select a Route for Order #{row.orderId}
                    </Typography>
                    {matchingRoutes.length > 0 ? (
                        <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Route ID</TableCell>
                                        <TableCell>Current Location</TableCell>
                                        <TableCell>Route Addresses</TableCell>
                                        <TableCell>Capacity</TableCell>
                                        <TableCell>Current Load</TableCell>
                                        <TableCell>Delivery Staff</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {matchingRoutes.map((route) => (
                                        <TableRow key={route.routeId}>
                                            <TableCell>
                                                {route.routeId}
                                            </TableCell>
                                            <TableCell>
                                                {route.currentLocation}
                                            </TableCell>
                                            <TableCell>
                                                {route.routeAddresses
                                                    .map(
                                                        (address) =>
                                                            address.city
                                                    )
                                                    .join(", ")}
                                            </TableCell>
                                            <TableCell>
                                                {route.capacity}
                                            </TableCell>
                                            <TableCell>
                                                {route.currentLoad}
                                            </TableCell>
                                            <TableCell>
                                                {route.deliveryStaff.fullName}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() =>
                                                        handleAddOrderToRoute(
                                                            route.routeId
                                                        )
                                                    }
                                                    disabled={
                                                        route.currentLoad >=
                                                        route.capacity
                                                    }
                                                >
                                                    Add
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            {error || "No matching routes found!"}
                        </Typography>
                    )}
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={() => setRouteModalOpen(false)}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>

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
                                        <TableCell>Pickup Address</TableCell>
                                        <TableCell>Shipping Address</TableCell>
                                        <TableCell>Distance</TableCell>
                                        <TableCell>Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {row?.startAddressLine || ""}
                                        </TableCell>
                                        <TableCell>
                                            {row?.endAddressLine || ""}
                                        </TableCell>
                                        <TableCell>{row.distance}</TableCell>
                                        <TableCell>{row.totalPrice}</TableCell>
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
                                <Table size="small" aria-label="koi details">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Koi ID</TableCell>
                                            <TableCell>Koi Name</TableCell>
                                            <TableCell>Weight (kg)</TableCell>
                                            <TableCell>Koi Condition</TableCell>
                                            <TableCell>Price ($)</TableCell>
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
                                                        {koiDetail.koiId}
                                                    </TableCell>
                                                    <TableCell>
                                                        {koiDetail.koiName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {koiDetail.weight}
                                                    </TableCell>
                                                    <TableCell>
                                                        {koiDetail.koiCondition}
                                                    </TableCell>
                                                    <TableCell>
                                                        {koiDetail.price}
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
        </React.Fragment>
    )
}

OrderRow.propTypes = {
    row: PropTypes.object.isRequired,
    setAlertOpen: PropTypes.func.isRequired,
    setAlertMessage: PropTypes.func.isRequired,
    setAlertSeverity: PropTypes.func.isRequired,
}
export default function ManageRoute() {
    const [order, setOrder] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [orderStatus, setOrderStatus] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("success")

    useEffect(() => {
        fetchOrders()
        fetchOrderStatus()
    }, [])

    const fetchOrders = async () => {
        try {
            const data = await api.get("orders/unrouted") // Make sure this URL is correct and reachable
            if (data.success && Array.isArray(data.order)) {
                const filtered = data.order.filter(
                    (o) => o.orderStatusId === 7 && o.deliveryStaffId === null
                )
                setOrder(data.order)
                setFilteredOrders(filtered)
            } else {
                console.log(
                    "No orders found or incorrect response structure:",
                    data
                )
            }
        } catch (error) {
            console.error("Error fetching orders:", error) // Log the error for debugging
            UserToast("error", "An error occurred while fetching orders.")
        }
    }

    const fetchOrderStatus = async () => {
        try {
            const data = await api.get("order-status/")
            if (data.success) {
                setOrderStatus(data.orderStatuses)
            } else {
                console.log("Error fetching order statuses.")
            }
        } catch (error) {
            UserToast(
                "error",
                "An error occurred while fetching order statuses."
            )
        }
    }

    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    return (
        <>
            <Box display="flex">
                <AdminSideMenu />
                {/* Main Table Area */}
                <Box flex={1} padding={3}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                        Manage Routing
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>
                                        <Typography
                                            fontWeight={600}
                                            align="center"
                                        >
                                            Order ID
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight={600}
                                            align="center"
                                        >
                                            Customer
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight={600}
                                            align="center"
                                        >
                                            Order Date
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight={600}
                                            align="center"
                                        >
                                            Payment Status
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight={600}
                                            align="center"
                                        >
                                            Status
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight={600}
                                            align="center"
                                        >
                                            Delivering Staff
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight={600}
                                            align="center"
                                        >
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <OrderRow
                                            key={order.orderId}
                                            row={order}
                                            setAlertOpen={setAlertOpen}
                                            setAlertMessage={setAlertMessage}
                                            setAlertSeverity={setAlertSeverity}
                                            fetchOrders={fetchOrders}
                                        />
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            No orders available for route
                                            creation.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            {/* Snackbar and Alert */}
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
        </>
    )
}
