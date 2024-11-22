import { useState, useEffect } from "react"
import api from "../../../../api/CallAPI"
import Chart from "chart.js/auto"
import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

export default function BarChart() {
    ChartJS.register(ArcElement, Tooltip, Legend)

    const [orders, setOrders] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    useEffect(() => {
        api.get("orders/user/" + user.userId).then((response) => {
            console.log(response.order)
            setOrders(response.order)
        })
    }, [user])

    const orderByStatus = (status) => {
        if (!orders) return 0
        return orders.filter((order) => order.orderStatusId === status).length
    }

    const data = {
        labels: [
            "Đang xử lí",
            "Tiếp nhận đơn hàng",
            "Đang xác nhận yêu cầu",
            "Đang lấy hàng, xử lí thủ tục hải quan (Nếu có)",
            "Đã lấy hàng, đang kiểm tra sức khỏe",
            "Đang đóng gói, chuẩn bị giấy chứng nhận",
            "Đã đóng gói, chuẩn bị vận chuyển",
            "Đang vận chuyển",
            "Chuẩn bị bàn giao cá",
            "Xác nhận giao hàng thành công",
            "Xác nhận hủy đơn hàng",
        ],
        datasets: [
            {
                label: "Order By Status",
                data: [
                    orderByStatus(1),
                    orderByStatus(2),
                    orderByStatus(3),
                    orderByStatus(4),
                    orderByStatus(5),
                    orderByStatus(6),
                    orderByStatus(7),
                    orderByStatus(8),
                    orderByStatus(9),
                    orderByStatus(10),
                    orderByStatus(11),
                ],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(153, 102, 255)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(153, 102, 255)",
                ],
                hoverOffset: 4,
            },
        ],
    }

    return (
        <div>
            <Bar data={data} />
        </div>
    )
}
