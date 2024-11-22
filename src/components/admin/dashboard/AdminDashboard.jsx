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
    Legend,
} from "recharts"
import { TextField } from "@mui/material"
import dayjs from "dayjs"
import api from "../../../api/CallAPI"

export default function AdminDashboard() {
    const [ordersData, setOrdersData] = useState([])
    const [chartData, setChartData] = useState([])
    const [filteredOrdersData, setFilteredOrdersData] = useState([])
    const [filteredChartData, setFilteredChartData] = useState([])
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalSuccess, setTotalSuccess] = useState(0)
    const [totalCancel, setTotalCancel] = useState(0)

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    // Fetch orders data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await api.get("orders/")
                const ordersArray = Array.isArray(data.order)
                    ? data.order
                    : data.order || []

                const dataWithId = ordersArray.map((order, index) => ({
                    id: order.orderId || index,
                    customer: order.customerName,
                    date: order.orderDate,
                    total: order.totalPrice || 0,
                    orderStatusId: order.orderStatusId,
                }))
                setOrdersData(dataWithId)
                setFilteredOrdersData(dataWithId)

                const dateCountMap = {}
                const successCountMap = {}
                const cancelCountMap = {}

                dataWithId.forEach((order) => {
                    dateCountMap[order.date] =
                        (dateCountMap[order.date] || 0) + 1
                    if (order.orderStatusId === 10) {
                        successCountMap[order.date] =
                            (successCountMap[order.date] || 0) + 1
                    }
                    if (order.orderStatusId === 11) {
                        cancelCountMap[order.date] =
                            (cancelCountMap[order.date] || 0) + 1
                    }
                })

                const transformedData = Object.keys(dateCountMap).map(
                    (date) => ({
                        date,
                        orderCount: dateCountMap[date],
                        successCount: successCountMap[date] || 0,
                        cancelCount: cancelCountMap[date] || 0,
                    })
                )
                setChartData(transformedData)
                setFilteredChartData(transformedData)

                // Update total counts
                setTotalOrders(dataWithId.length)
                setTotalSuccess(
                    dataWithId.filter((order) => order.orderStatusId === 10)
                        .length
                )
                setTotalCancel(
                    dataWithId.filter((order) => order.orderStatusId === 11)
                        .length
                )
            } catch (error) {
                console.error("Error fetching orders data:", error)
            }
        }

        fetchOrders()
    }, [])

    // Filter data based on date range
    useEffect(() => {
        if (startDate && endDate) {
            const start = dayjs(startDate)
            const end = dayjs(endDate)

            const filteredOrders = ordersData.filter((order) => {
                const orderDate = dayjs(order.date)
                return orderDate.isBetween(start, end, "day", "[]")
            })

            const filteredChart = chartData.filter((data) => {
                const chartDate = dayjs(data.date)
                return chartDate.isBetween(start, end, "day", "[]")
            })

            setFilteredOrdersData(filteredOrders)
            setFilteredChartData(filteredChart)

            const statusCounts = filteredOrders.reduce(
                (acc, order) => {
                    if (order.orderStatusId === 10) acc.success++
                    if (order.orderStatusId === 11) acc.canceled++
                    return acc
                },
                { success: 0, canceled: 0 }
            )

            // Update total counts based on filtered data
            setTotalOrders(filteredOrders.length)
            setTotalSuccess(statusCounts.success)
            setTotalCancel(statusCounts.canceled)
        } else {
            setFilteredOrdersData(ordersData)
            setFilteredChartData(chartData)
        }
    }, [startDate, endDate, ordersData, chartData])

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

                <Box display="flex" gap={2} mb={4}>
                    <TextField
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Box>

                <Typography variant="h4" gutterBottom>
                    Order Trends Over Time
                </Typography>
                <Box sx={{ width: "100%", height: 400, marginBottom: 4 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis>
                                <Label
                                    value="Order Count"
                                    angle={-90}
                                    position="insideLeft"
                                />
                            </YAxis>
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="orderCount"
                                stroke="#8884d8"
                                name="Total Orders"
                            />
                            <Line
                                type="monotone"
                                dataKey="successCount"
                                stroke="#82ca9d"
                                name="Successful Orders"
                            />
                            <Line
                                type="monotone"
                                dataKey="cancelCount"
                                stroke="#ff4d4d"
                                name="Canceled Orders"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>

                <Typography variant="h5" gutterBottom>
                    Order History
                </Typography>
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={filteredOrdersData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Box>
        </>
    )
}
