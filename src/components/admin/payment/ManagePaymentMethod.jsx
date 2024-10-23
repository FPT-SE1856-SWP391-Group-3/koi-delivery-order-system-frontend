import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../payment/ManagePaymentMethod.css";
import ComponentPath from "routes/ComponentPath";

export default function ManagePaymentMethod() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      api.get("PaymentMethods/").then((data) => {
        if (data.success) {
          setPaymentMethods(data.paymentMethods);
          console.log(data.paymentMethods);
        } else {
          console.log("Không có phương thức thanh toán!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, []);

  async function deletePaymentMethod(paymentMethodId) {
    try {
      api.del("PaymentMethods/" + paymentMethodId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newPaymentTypes = paymentMethods.filter(
            (paymentMethod) => paymentMethod.paymentMethodId !== paymentMethodId
          );
          setPaymentMethods(newPaymentTypes);
        } else {
          alert("Xóa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
  }

  return (
    <div>
      <Sidebar />
      <div className="content-container">
        <h1>Payment Methods</h1>
        <a href={ComponentPath.admin.payment.createPaymentType} className="add-payment-btn">
          Add Payment Method
        </a>
        <table className="payment-table">
          <thead>
            <th>PaymentMethodId</th>
            <th>Name</th>
            <th>Action</th>
          </thead>
          <tbody>
            {paymentMethods.map((paymentType) => (
              <tr key={paymentType.paymentMethodId}>
                <td>{paymentType.paymentMethodId}</td>
                <td>{paymentType.paymentMethodName}</td>
                <td>
                  <button
                    onClick={() =>
                      deletePaymentMethod(paymentType.paymentMethodId)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <a
                    href={ComponentPath.admin.payment.editPaymentType + paymentType.paymentMethodId}
                    className="update-btn"
                  >
                    Update
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
