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
} from "recharts"
import api from "../../../api/CallAPI"

export default function AdminDashboard() {
    const [ordersData, setOrdersData] = useState([])
    const [chartData, setChartData] = useState([])

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
                }))
                setOrdersData(dataWithId)

                // Prepare data for the chart by counting orders per date
                const dateCountMap = dataWithId.reduce((acc, order) => {
                    acc[order.date] = (acc[order.date] || 0) + 1
                    return acc
                }, {})

                // Transform data into an array format for the chart
                const transformedData = Object.keys(dateCountMap).map(
                    (date) => ({
                        date,
                        orderCount: dateCountMap[date],
                    })
                )
                setChartData(transformedData)
            } catch (error) {
                console.error("Error fetching orders data:", error)
            }
        }

        fetchOrders()
    }, [])

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
                {/* Line Chart Section */}
                <Typography variant="h4" gutterBottom>
                    Order Counts Over Time
                </Typography>
                <Box sx={{ width: "100%", height: 400, marginBottom: 4 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date">
                                <Label
                                    value="Date"
                                    offset={-5}
                                    position="insideBottom"
                                />
                            </XAxis>
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
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>

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
