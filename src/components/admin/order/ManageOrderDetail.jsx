import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";

import { useEffect } from "react";

export default function ManageOrderDetail() {
  const [UserOrderDetails, setUserOrderDetails] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    api.get("OrderDetails/" + orderId).then((data) => {
      if (data.success) {
        setUserOrderDetails(data.orderDetail);
        console.log(data.orderDetail);
      } else {
        console.log("Không có chi tiết đơn hàng!");
      }
    });
  }, []);

  console.log(UserOrderDetails);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Danh sách chi tiết đơn hàng</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã chi tiết đơn hàng</th>
                  <th scope="col">Ten ca koi </th>
                  <th scope="col">trong luong</th>
                  <th scope="col">Gia</th>
                  <th scope="col">Loai</th>
                </tr>
              </thead>
              <tbody>
                {UserOrderDetails.map((UserOrderDetail) => (
                  <tr key={UserOrderDetail.orderDetailId}>
                    <td>{UserOrderDetail.orderDetailId}</td>
                    <td>{UserOrderDetail.koi.koiName}</td>
                    <td>{UserOrderDetail.koi.weight}</td>
                    <td>{UserOrderDetail.koi.price}</td>
                    <td>{UserOrderDetail.koi.koiType.koiTypeName}</td>
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
