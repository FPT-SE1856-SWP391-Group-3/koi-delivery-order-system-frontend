import React, { useState, useEffect } from "react"
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Fab,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Tooltip,
    Modal,
    TextField,
    Button,
    Collapse,
    IconButton,
} from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs from "dayjs"
import AddIcon from "@mui/icons-material/Add"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import DeleteIcon from "@mui/icons-material/Delete"
import AdminSideMenu from "../components/AdminSideMenu"
import api from "../../../api/CallAPI" // Adjust to your API file locationimport UserToast from "../../user/alert/UserToast";

const CreateRoute = () => {
    const [routes, setRoutes] = useState([])
    const [error, setError] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertSeverity, setAlertSeverity] = useState("success")
    const [expandedRouteId, setExpandedRouteId] = useState(null)
    const [orders, setOrders] = useState({})
    const [routeModalOpen, setRouteModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteRouteModalOpen, setDeleteRouteModalOpen] = useState(false)
    const [selectedRouteId, setSelectedRouteId] = useState(null)
    const [selectedOrderId, setSelectedOrderId] = useState(null)

    // Fields for creating a new route
    const [deliveryStaffId, setDeliveryStaffId] = useState("")
    const [deliveryStaffOptions, setDeliveryStaffOptions] = useState([])
    const [cities, setCities] = useState([])
    const [currentLocation, setCurrentLocation] = useState("")
    const [capacity, setCapacity] = useState("")
    const [capacityError, setCapacityError] = useState("")
    const [estimatedStartTime, setEstimatedStartTime] = useState(dayjs())
    const [estimatedEndTime, setEstimatedEndTime] = useState(dayjs())

    useEffect(() => {
        fetchRoutes()
        fetchDeliveryStaffOptions()
    }, [])

    const fetchRoutes = async () => {
        try {
            const response = await api.get("routes")
            if (response.success && Array.isArray(response.routes)) {
                setRoutes(response.routes)
            } else {
                setError("Error loading routes. Please try again.")
            }
        } catch (error) {
            console.error("Error fetching routes:", error)
            setError("An error occurred while fetching routes.")
        }
    }
    const fetchDeliveryStaffOptions = async () => {
        try {
            const response = await api.get("users")
            if (response.success && Array.isArray(response.users)) {
                const filteredUsers = response.users.filter(
                    (user) => user.roleId === 4
                )
                setDeliveryStaffOptions(filteredUsers)
            } else {
                console.error("Error fetching delivery staff")
            }
        } catch (error) {
            console.error("Error fetching delivery staff:", error)
        }
    }
    const validateCapacity = (value) => {
        if (value < 1 || value > 10) {
            setCapacityError("Capacity must be between 1 and 10")
            return false
        }
        setCapacityError("")
        return true
    }

    const fetchOrdersForRoute = async (routeId) => {
        try {
            const response = await api.get(`orders/route/${routeId}`)
            if (response.success && Array.isArray(response.orderIds)) {
                setOrders((prevOrders) => ({
                    ...prevOrders,
                    [routeId]: response.orderIds,
                }))
            } else {
                setOrders((prevOrders) => ({ ...prevOrders, [routeId]: [] }))
                setAlertMessage(`No orders found for route ID ${routeId}`)
                setAlertSeverity("info")
            }
        } catch (error) {
            console.error(`Error fetching orders for route ${routeId}:`, error)
            setAlertMessage("Error fetching orders. Please try again.")
            setAlertSeverity("error")
        }
    }

    const handleExpandClick = (routeId) => {
        if (expandedRouteId === routeId) {
            setExpandedRouteId(null)
        } else {
            setExpandedRouteId(routeId)
            if (!orders[routeId]) {
                fetchOrdersForRoute(routeId)
            }
        }
    }

    const handleDeleteOrderClick = (orderId) => {
        setSelectedOrderId(orderId)
        setDeleteModalOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (expandedRouteId && selectedOrderId) {
            try {
                const response = await api.post("routes/order", {
                    routeId: expandedRouteId,
                    orderId: selectedOrderId,
                })
                if (response.success) {
                    setAlertMessage("Order removed from route successfully!")
                    setAlertSeverity("success")
                    setOrders((prevOrders) => ({
                        ...prevOrders,
                        [expandedRouteId]: prevOrders[expandedRouteId].filter(
                            (order) => order.orderId !== selectedOrderId
                        ),
                    }))
                    fetchRoutes()
                    setSelectedOrderId(null) // Reset state after deletion
                } else {
                    setAlertMessage("Failed to remove order from route.")
                    setAlertSeverity("warning")
                }
            } catch (error) {
                console.error("Error removing order from route:", error)
            }
        }
        setDeleteModalOpen(false)
    }

    const handleDeleteRouteClick = (routeId) => {
        if (orders[routeId] && orders[routeId].length > 0) {
            setAlertMessage(
                "You need to remove all orders from the route before deleting"
            )
            setAlertSeverity("warning")
        } else {
            setSelectedRouteId(routeId)
            setDeleteRouteModalOpen(true)
        }
    }

    const handleConfirmDeleteRoute = async () => {
        try {
            const response = await api.del(`routes/${selectedRouteId}`)
            if (response.success) {
                setAlertMessage("Route deleted successfully!")
                setAlertSeverity("success")
                setRoutes((prevRoutes) =>
                    prevRoutes.filter(
                        (route) => route.routeId !== selectedRouteId
                    )
                )
                setSelectedRouteId(null) // Reset state after deletion
            } else {
                setAlertMessage("Failed to delete route. Please try again.")
                setAlertSeverity("warning")
            }
        } catch (error) {
            setAlertMessage(
                "You need to remove all orders from the route before deleting"
            )
            setAlertSeverity("warning")
            console.error("Error deleting route:", error)
        }
        setDeleteRouteModalOpen(false)
    }

    const handleAddRouteClick = () => {
        setRouteModalOpen(true)
    }

    const handleRouteSubmit = async () => {
        if (!validateCapacity(capacity)) {
            setAlertMessage("Please correct the errors before submitting.")
            setAlertSeverity("error")
            return
        }
        const newRoute = {
            deliveryStaffId: parseInt(deliveryStaffId, 10),
            cities: cities, // Ensure this is a single string, not an array
            currentLocation,
            estimatedStartTime: estimatedStartTime.toISOString(),
            estimatedEndTime: estimatedEndTime.toISOString(),
            capacity: parseInt(capacity, 10),
        }

        try {
            const response = await api.post("routes", newRoute)

            // Check if the response data indicates success
            if (response.success) {
                setAlertMessage("Route added successfully!")
                setAlertSeverity("success")

                // Close the modal and reset form fields
                setRouteModalOpen(false)
                setDeliveryStaffId("")
                setCities("")
                setCurrentLocation("")
                setCapacity("")
                setEstimatedStartTime(dayjs())
                setEstimatedEndTime(dayjs())

                // Refresh the routes list to show the new route in the table
                fetchRoutes()
            } else {
                // If response.data or success is not as expected, display an error message
                setAlertMessage(
                    "Failed to add route. Please check input and try again."
                )
                setAlertSeverity("warning")
            }
        } catch (error) {
            console.error("Error creating route:", error)
            setAlertMessage("An error occurred while adding the route.")
            setAlertSeverity("error")
        }
    }
    const formatDestinations = (addresses) => {
        if (!addresses?.length)
            return { visibleCities: "No Destinations", tooltipCities: "" }

        const cities = addresses.map((address) => address?.city || "Unknown")
        return {
            visibleCities: `${cities.slice(0, 2).join(", ")}${cities.length > 2 ? ` (+${cities.length - 2} more...)` : ""}`,
            tooltipCities: cities.join(", "),
        }
    }
    return (
        <Box display="flex">
            <AdminSideMenu />
            <Box flex={1} padding={3}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Manage Routes
                </Typography>
                {alertMessage && (
                    <Alert
                        severity={alertSeverity}
                        onClose={() => setAlertMessage(null)}
                        sx={{ mb: 2 }}
                    >
                        {alertMessage}
                    </Alert>
                )}
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table aria-label="routes table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Route ID</TableCell>
                                    <TableCell>Capacity</TableCell>
                                    <TableCell>Current Load</TableCell>
                                    <TableCell>Current Location</TableCell>
                                    <TableCell>Destinations</TableCell>
                                    <TableCell>Estimated Start Time</TableCell>
                                    <TableCell>Estimated End Time</TableCell>
                                    <TableCell>Delivery Staff</TableCell>
                                    <TableCell>Delete Route</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {routes.length > 0 ? (
                                    routes.map((route) => (
                                        <React.Fragment key={route.routeId}>
                                            <TableRow>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() =>
                                                            handleExpandClick(
                                                                route.routeId
                                                            )
                                                        }
                                                        size="small"
                                                    >
                                                        {expandedRouteId ===
                                                        route.routeId ? (
                                                            <ExpandLessIcon />
                                                        ) : (
                                                            <ExpandMoreIcon />
                                                        )}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    {route.routeId}
                                                </TableCell>
                                                <TableCell>
                                                    {route.capacity}
                                                </TableCell>
                                                <TableCell>
                                                    {route.currentLoad}
                                                </TableCell>
                                                <TableCell>
                                                    {route.currentLocation}
                                                </TableCell>
                                                <TableCell>
                                                    {route.routeAddresses
                                                        ? (() => {
                                                              const {
                                                                  visibleCities,
                                                                  tooltipCities,
                                                              } =
                                                                  formatDestinations(
                                                                      route.routeAddresses
                                                                  )
                                                              return tooltipCities ? (
                                                                  <Tooltip
                                                                      arrow
                                                                      placement="top"
                                                                      aria-label="View all destinations"
                                                                      title={
                                                                          tooltipCities
                                                                      } // Full list in tooltip
                                                                  >
                                                                      <Typography
                                                                          variant="body2"
                                                                          sx={{
                                                                              cursor: "pointer",
                                                                              whiteSpace:
                                                                                  "nowrap",
                                                                              overflow:
                                                                                  "hidden",
                                                                              textOverflow:
                                                                                  "ellipsis",
                                                                              "&:hover":
                                                                                  {
                                                                                      textDecoration:
                                                                                          "underline",
                                                                                  },
                                                                          }}
                                                                      >
                                                                          {
                                                                              visibleCities
                                                                          }
                                                                      </Typography>
                                                                  </Tooltip>
                                                              ) : (
                                                                  <Typography variant="body2">
                                                                      {
                                                                          visibleCities
                                                                      }
                                                                  </Typography>
                                                              )
                                                          })()
                                                        : "No Destinations"}
                                                </TableCell>
                                                <TableCell>
                                                    {route.estimatedStartTime}
                                                </TableCell>
                                                <TableCell>
                                                    {route.estimatedEndTime}
                                                </TableCell>
                                                <TableCell>
                                                    {route.deliveryStaffId}.{" "}
                                                    {
                                                        route.deliveryStaff
                                                            .fullName
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            handleDeleteRouteClick(
                                                                route.routeId
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        paddingBottom: 0,
                                                        paddingTop: 0,
                                                    }}
                                                    colSpan={12}
                                                >
                                                    <Collapse
                                                        in={
                                                            expandedRouteId ===
                                                            route.routeId
                                                        }
                                                        timeout="auto"
                                                        unmountOnExit
                                                    >
                                                        <Box margin={2}>
                                                            <Typography
                                                                variant="h6"
                                                                gutterBottom
                                                            >
                                                                Orders for Route{" "}
                                                                {route.routeId}
                                                            </Typography>
                                                            <Table
                                                                size="small"
                                                                aria-label="orders"
                                                            >
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            Order
                                                                            ID
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Customer
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Order
                                                                            Date
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Pickup
                                                                            Address
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Shipping
                                                                            Address
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Total
                                                                            Price
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            Action
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {orders[
                                                                        route
                                                                            .routeId
                                                                    ] &&
                                                                    orders[
                                                                        route
                                                                            .routeId
                                                                    ].length >
                                                                        0 ? (
                                                                        orders[
                                                                            route
                                                                                .routeId
                                                                        ].map(
                                                                            (
                                                                                order
                                                                            ) => (
                                                                                <TableRow
                                                                                    key={
                                                                                        order.orderId
                                                                                    }
                                                                                >
                                                                                    <TableCell>
                                                                                        {
                                                                                            order.orderId
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        {
                                                                                            order.customerName
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        {
                                                                                            order.orderDate
                                                                                        }
                                                                                    </TableCell>
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
                                                                                            order.totalPrice
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <IconButton
                                                                                            color="error"
                                                                                            onClick={() =>
                                                                                                handleDeleteOrderClick(
                                                                                                    order.orderId
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <DeleteIcon />
                                                                                        </IconButton>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <TableRow>
                                                                            <TableCell
                                                                                colSpan={
                                                                                    8
                                                                                }
                                                                                align="center"
                                                                            >
                                                                                No
                                                                                orders
                                                                                available
                                                                                for
                                                                                this
                                                                                route.
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )}
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">
                                            No routes available.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Floating Action Button for Adding Route */}
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    onClick={handleAddRouteClick}
                >
                    <AddIcon />
                </Fab>

                {/* Modal for Adding New Route */}
                <Modal
                    open={routeModalOpen}
                    onClose={() => setRouteModalOpen(false)}
                    aria-labelledby="add-route-modal-title"
                    aria-describedby="add-route-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "90%",
                            maxWidth: 600,
                            bgcolor: "background.paper",
                            borderRadius: 3,
                            boxShadow: 24,
                            p: 4,
                            maxHeight: "90vh",
                            overflowY: "auto",
                        }}
                    >
                        <Typography
                            variant="h6"
                            id="add-route-modal-title"
                            gutterBottom
                            sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                                mb: 3,
                            }}
                        >
                            Add New Route
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Delivery Staff</InputLabel>
                                    <Select
                                        value={deliveryStaffId}
                                        onChange={(e) =>
                                            setDeliveryStaffId(e.target.value)
                                        }
                                    >
                                        {deliveryStaffOptions.map((staff) => (
                                            <MenuItem
                                                key={staff.userId}
                                                value={staff.userId}
                                            >
                                                {`${staff.userId} - ${staff.fullName}`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Cities"
                                    fullWidth
                                    variant="outlined"
                                    helperText="Separate multiple cities with commas"
                                    value={cities}
                                    onChange={(e) => setCities(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Current Location"
                                    fullWidth
                                    variant="outlined"
                                    value={currentLocation}
                                    onChange={(e) =>
                                        setCurrentLocation(e.target.value)
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Capacity"
                                    fullWidth
                                    variant="outlined"
                                    value={capacity}
                                    onChange={(e) => {
                                        setCapacity(e.target.value)
                                        validateCapacity(e.target.value)
                                    }}
                                    type="number"
                                    error={!!capacityError}
                                    helperText={capacityError}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        label="Estimated Start Time"
                                        value={estimatedStartTime}
                                        onChange={setEstimatedStartTime}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                variant: "outlined",
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateTimePicker
                                        label="Estimated End Time"
                                        value={estimatedEndTime}
                                        onChange={setEstimatedEndTime}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                variant: "outlined",
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                        <Box
                            mt={4}
                            display="flex"
                            justifyContent="flex-end"
                            gap={2}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleRouteSubmit}
                                sx={{ fontWeight: "bold", px: 4 }}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setRouteModalOpen(false)}
                                sx={{ px: 4 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Modal for Confirming Order Removal */}
                <Modal
                    open={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    aria-labelledby="delete-order-modal-title"
                    aria-describedby="delete-order-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography
                            variant="h6"
                            id="delete-order-modal-title"
                            gutterBottom
                        >
                            Confirm Delete
                        </Typography>
                        <Typography
                            id="delete-order-modal-description"
                            sx={{ mb: 2 }}
                        >
                            Are you sure you want to remove this order from the
                            route?
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setDeleteModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Modal for Confirming Route Deletion */}
                <Modal
                    open={deleteRouteModalOpen}
                    onClose={() => setDeleteRouteModalOpen(false)}
                    aria-labelledby="delete-route-modal-title"
                    aria-describedby="delete-route-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography
                            variant="h6"
                            id="delete-route-modal-title"
                            gutterBottom
                        >
                            Confirm Delete Route
                        </Typography>
                        <Typography
                            id="delete-route-modal-description"
                            sx={{ mb: 2 }}
                        >
                            Are you sure you want to delete this route? This
                            action cannot be undone.
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleConfirmDeleteRoute}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setDeleteRouteModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}

export default CreateRoute
