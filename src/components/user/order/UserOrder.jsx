import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../common/Header";
import { useEffect } from "react"; 


export default function UserOrder(){

    const navigate = useNavigate();
    const [order, setOrder] = useState([{}]);
    const userId = JSON.parse(localStorage.getItem("userId"));
    
    useEffect(() => {
        api.get("Orders/" + userId).then((data) => {
          if (data.success) {
            setOrder(data.order);
            console.log(data.order);
          } else {
            console.log("Không có đơn hàng!");
          }
        });
    }, [userId]);
    
    return (
        <div>
        {/* <Header /> */}
        <div className="container">
            <div className="row">
            <div className="col-md-6 offset-md-3">
                <h2 className="text-center">Danh sách đơn hàng</h2>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Ngày đặt hàng</th>
                    <th scope="col">Ngày giao hàng</th>
                    <th scope="col">Địa chỉ lấy hàng</th>
                    <th scope="col">Địa chỉ giao hàng</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chi tiết</th>
                    <th scope="col">FeedBack</th>
                    <th scope="col">Document</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((order) => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.deliveryDate}</td>
                        <td>{order.startAddress == null ? "" : order.startAddress.addressLine}</td>
                        <td>{order.endAddress == null ? "" : order.endAddress.addressLine}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.orderStatus == null ? "" : order.orderStatus.orderStatusName}</td>
                        <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/order-detail/" + order.orderId)}
                        >
                            Chi tiết
                        </button>
                        </td>
                        <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/feedback/" + order.orderId)}
                        >
                            Feedback
                        </button>
                        </td>
                        <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/add-document/" + order.orderId + "/" + order.customerId)}
                        >
                            Document
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    );
    
}