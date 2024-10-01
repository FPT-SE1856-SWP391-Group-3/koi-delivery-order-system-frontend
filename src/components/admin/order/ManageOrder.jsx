import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";
import { useEffect } from "react";
import { set } from "react-hook-form";


export default function ManageOrder(){
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    
    useEffect(() => {
      api.get("Orders/").then((data) => {
        if (data.success) {
          setOrder(data.order);
          console.log(data.order);
        } else {
          console.log("Không có đơn hàng!");
        }
      });
      api.get("OrderStatus/").then((data) => {
        if (data.success) {
          setOrderStatus(data.orderStatuses);
          console.log(data.orderStatuses);
        } else {
          console.log("Error");
        }
      });
    }, []);

    const updateOrderStatus = async (event, orderId) => {
        console.log(orderId);
        var updateOrderStatus = {
            updateOrderStatusId: parseInt(event.target.value)
        };
        console.log(updateOrderStatus)
        try{
            api.put("Orders/update-status/" + orderId, updateOrderStatus)
            .then((data) => {
                if (data.success) {
                    alert("Cập nhật trạng thái thành công!");
                    navigate("/admin/manage-order");
                } else {
                    alert("Cập nhật trạng thái thất bại!");
                }
            });

        } catch(error){
            console.error("Error during update:", error);
            alert("An error occurred during update. Please try again.");
        }
    }
    
    return (
        <div>
        <Header />
        <div className="container">
            <div className="row">
            <div className="col-md-6 offset-md-3">
                <h2 className="text-center">Danh sách đơn hàng</h2>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Mã khách hàng</th>
                    <th scope="col">Ngày đặt hàng</th>
                    <th scope="col">Ngày giao hàng</th>
                    <th scope="col">Địa chỉ lấy hàng</th>
                    <th scope="col">Địa chỉ giao hàng</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chi tiết</th>
                    <th scope="col">Chinh sua trang thai</th>
                    <th scope="col">Transportation Report </th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((order) => (
                    <tr key={order.orderId}>
                        <td>{order.customerId}</td>
                        <td>{order.orderId}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.deliveryDate}</td>
                        <td>{order.startAddress == null ? "" : order.startAddress.addressLine}</td>
                        <td>{order.endAddress == null ? "" : order.endAddress.addressLine}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.orderStatus.orderStatusName}</td>
                        <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/admin/manage-order-detail/" + order.orderId)}
                        >
                            Chi tiết
                        </button>
                        </td>
                        <td>
                            <select 
                            onChange={(event) => {updateOrderStatus(event, order.orderId); }}>
                                {orderStatus.map((orderStatus) => (
                                    <option key={orderStatus.orderStatusId} value={orderStatus.orderStatusId} selected={orderStatus.orderStatusId === order.orderStatusId}>{orderStatus.orderStatusName}</option>
                                ))}
                            </select>
                        </td>
                        <button className="btn btn-primary" onClick={() => navigate("/admin/create-transportation-report/" + order.orderId)}>Transportation Report</button>
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