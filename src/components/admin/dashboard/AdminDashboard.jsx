import * as React from "react"
import { useState, useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import AdminSideMenu from "../components/AdminSideMenu"
import { DataGrid } from "@mui/x-data-grid"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
    Brush,
} from "recharts"
import api from "../../../api/CallAPI"

export default function AdminDashboard() {
    const [ordersData, setOrdersData] = useState([])
    const [chartData, setChartData] = useState([])
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalSuccess, setTotalSuccess] = useState(0)
    const [totalCancel, setTotalCancel] = useState(0)

    // Fetch orders data from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await api.get("Orders/")
                console.log("Fetched data:", data)

                // Ensure data is an array to avoid errors
                const ordersArray = Array.isArray(data.order)
                    ? data.order
                    : data.order || []

                // Prepare data for DataGrid with required fields
                const dataWithId = ordersArray.map((order, index) => ({
                    id: order.orderId || index,
                    customer: order.customerId,
                    date: order.orderDate,
                    total: order.totalPrice || 0,
                    orderStatusId: order.orderStatusId, // Include orderStatusId
                }))
                setOrdersData(dataWithId)

                // Initialize counters
                let totalOrderCount = 0
                let successCount = 0
                let cancelCount = 0

                // Prepare data for the chart
                const dateCountMap = {}
                const successCountMap = {}
                const cancelCountMap = {}

                dataWithId.forEach((order) => {
                    totalOrderCount++ // Total order count
                    if (order.orderStatusId === 10) successCount++ // Successful orders
                    if (order.orderStatusId === 11) cancelCount++ // Canceled orders

                    // Total orders per date
                    dateCountMap[order.date] =
                        (dateCountMap[order.date] || 0) + 1

                    // Count of successful orders (orderStatusId = 10)
                    if (order.orderStatusId === 10) {
                        successCountMap[order.date] =
                            (successCountMap[order.date] || 0) + 1
                    }

                    // Count of canceled orders (orderStatusId = 11)
                    if (order.orderStatusId === 11) {
                        cancelCountMap[order.date] =
                            (cancelCountMap[order.date] || 0) + 1
                    }
                })

                // Set total counts
                setTotalOrders(totalOrderCount)
                setTotalSuccess(successCount)
                setTotalCancel(cancelCount)

                // Transform data into an array format for the chart
                const transformedData = Object.keys(dateCountMap).map(
                    (date) => ({
                        date,
                        orderCount: dateCountMap[date],
                        successCount: successCountMap[date] || 0,
                        cancelCount: cancelCountMap[date] || 0,
                    })
                )
                setChartData(transformedData)
            } catch (error) {
                console.error("Error fetching orders data:", error)
            }
        }

        fetchOrders()
    }, [])

    // Define columns for DataGrid
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "customer", headerName: "Customer ID", width: 200 },
        { field: "date", headerName: "Date", width: 150 },
        { field: "total", headerName: "Total", width: 150 },
    ]

    return (
        <>
            <CssBaseline />
            <AdminSideMenu />
            <Box sx={{ marginLeft: "250px", padding: "20px" }}>
                {/* Summary Section */}
                <Typography variant="h4" gutterBottom>
                    Order Summary
                </Typography>
                <Box display="flex" gap={4} mb={4}>
                    <Box>
                        <Typography variant="h6">Total Orders</Typography>
                        <Typography variant="h5">{totalOrders}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6">Successful Orders</Typography>
                        <Typography variant="h5" color="green">
                            {totalSuccess}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6">Canceled Orders</Typography>
                        <Typography variant="h5" color="red">
                            {totalCancel}
                        </Typography>
                    </Box>
                </Box>

                {/* Line Chart Section */}
                <Typography variant="h4" gutterBottom>
                    Order Trends Over Time
                </Typography>
                <Box sx={{ width: "100%", height: 400, marginBottom: 4 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date"></XAxis>
                            <YAxis>
                                <Label
                                    value="Order Count"
                                    angle={-90}
                                    position="insideLeft"
                                />
                            </YAxis>
                            <Tooltip />
                            {/* Total Orders */}
                            <Line
                                type="monotone"
                                dataKey="orderCount"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                                name="Total Orders"
                            />
                            {/* Successful Orders */}
                            <Line
                                type="monotone"
                                dataKey="successCount"
                                stroke="#82ca9d"
                                activeDot={{ r: 8 }}
                                name="Successful Orders"
                            />
                            {/* Canceled Orders */}
                            <Line
                                type="monotone"
                                dataKey="cancelCount"
                                stroke="#ff4d4d"
                                activeDot={{ r: 8 }}
                                name="Canceled Orders"
                            />
                            {/* Brush Component for Zooming */}
                            <Brush
                                dataKey="date"
                                height={30}
                                stroke="#8884d8"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>

                {/* Order History Table Section */}
                <Typography variant="h5" gutterBottom>
                    Order History
                </Typography>
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={ordersData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                pageSize: 5,
                            },
                        }}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Box>
        </>
    )
}
