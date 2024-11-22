import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api/CallAPI"
import { useEffect } from "react"
import "../order/ManageOrderDetail.css"

export default function ManageOrderDetail() {
    const [UserOrderDetails, setUserOrderDetails] = useState([])
    const { orderId } = useParams()

    useEffect(() => {
        api.get("order-details/" + orderId).then((data) => {
            if (data.success) {
                setUserOrderDetails(data.orderDetail)
                console.log(data.orderDetail)
            } else {
                console.error("Error fetching OrderDetails:", data.message)
            }
        })
    }, [])

    console.log(UserOrderDetails)

    return (
        <>
            <a className="back-button" href="/admin/manage-order">
                Back
            </a>
            <div className="orderdetail-container">
                <h1 className="form-title">Order Details List</h1>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>OrderDetailId</th>
                            <th>Koi Name</th>
                            <th>Weight</th>
                            <th>Price</th>
                            <th>Koi Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserOrderDetails.map((UserOrderDetail) => (
                            <tr key={UserOrderDetail.orderDetailId}>
                                <td>{UserOrderDetail.orderDetailId}</td>
                                <td>{UserOrderDetail.koi.koiName}</td>
                                <td>{UserOrderDetail.koi.weight}</td>
                                <td>{UserOrderDetail.koi.price}</td>
                                <td>
                                    {UserOrderDetail.koi.koiType.koiTypeName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
