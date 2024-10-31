import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useEffect } from "react";

export default function UserOrderDetail({ orderId }) {
  const [UserOrderDetails, setUserOrderDetails] = useState([]);
  // const { orderId } = useParams();

  useEffect(() => {
    api.get("OrderDetails/OrderDetailsByOrderId/" + orderId).then((data) => {
      if (data.success) {
        setUserOrderDetails(data.orderDetails);
        console.log(data.orderDetails);
      } else {
        console.log("Không có chi tiết đơn hàng!");
      }
    });
  }, [orderId]);

  console.log(UserOrderDetails);

  return (
    <div>
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center">Danh sách chi tiết đơn hàng</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã chi tiết đơn hàng</th>
                  <th scope="col">Tên cá koi </th>
                  <th scope="col">Trọng lượng</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Loại</th>
                </tr>
              </thead>
              <tbody>
                {UserOrderDetails.length > 0 ? (
                  UserOrderDetails.map((UserOrderDetail) => (
                    <tr key={UserOrderDetail.orderDetailId}>
                      <td>{UserOrderDetail.orderDetailId}</td>
                      <td>{UserOrderDetail.koi.koiName}</td>
                      <td>{UserOrderDetail.koi.weight}</td>
                      <td>{UserOrderDetail.koi.price}</td>
                      <td>{UserOrderDetail.koi.koiType != null ? UserOrderDetail.koi.koiType.koiTypeName : "" }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Không có dữ liệu</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
