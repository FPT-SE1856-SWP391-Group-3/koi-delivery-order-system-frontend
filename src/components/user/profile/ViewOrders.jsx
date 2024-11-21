import api from "../../../api/CallAPI"
import { useState, useEffect } from "react"

export default function ViewOrders() {
    const [order, setOrder] = useState([])
    const [orderStatusMap, setOrderStatusMap] = useState({})
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch orders and order statuses in parallel
    const fetchOrdersAndStatuses = async () => {
        if (!user) {
            setError("User not found. Please log in.")
            return
        }

        try {
            const [orderData, statusData] = await Promise.all([
                api.get(`orders/${user.userId}`),
                api.get("order-status/"),
            ])

            if (orderData.success) {
                setOrder(orderData.order)
            } else {
                setError("No orders found!")
            }

            if (statusData.success) {
                const statusMap = statusData.orderStatuses.reduce(
                    (acc, status) => {
                        acc[status.orderStatusId] = status.orderStatusName
                        return acc
                    },
                    {}
                )
                setOrderStatusMap(statusMap)
            } else {
                setError("Failed to fetch order statuses.")
            }
        } catch (error) {
            console.error("Error fetching data:", error)
            setError("Failed to fetch orders or statuses. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrdersAndStatuses()
    }, [user])

    return (
        <>
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : order.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer ID</th>
                            <th>Order Date</th>
                            <th>Is Payment</th>
                            <th>Delivery Date</th>
                            <th>Pick up Address</th>
                            <th>Shipping Address</th>
                            <th>Distance</th>
                            <th>Delivery Time</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Order Document</th>
                            <th>Transportation Report</th>
                            <th>Delivering Staff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((o) => (
                            <tr key={o.orderId}>
                                <td>{o.orderId}</td>
                                <td>{o.customerId}</td>
                                <td>
                                    {new Date(o.orderDate).toLocaleDateString()}
                                </td>
                                <td>{o.isPayment ? "Yes" : "No"}</td>
                                <td>
                                    {new Date(
                                        o.deliveryDate
                                    ).toLocaleDateString()}
                                </td>
                                <td>{o.pickUpAddress}</td>
                                <td>{o.shippingAddress}</td>
                                <td>{o.distance}</td>
                                <td>{o.deliveryTime}</td>
                                <td>{o.totalAmount}</td>
                                <td>
                                    {orderStatusMap[o.orderStatusId] ||
                                        "Unknown Status"}
                                </td>
                                <td>{o.orderDocument}</td>
                                <td>{o.transportationReport}</td>
                                <td>{o.deliveringStaff}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
