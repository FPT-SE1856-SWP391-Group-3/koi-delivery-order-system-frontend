import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";

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
      <h1>Payment Methods</h1>
      <a href="/admin/addPaymentType">Add Payment Method</a>
      {paymentMethods.map((paymentType) => (
        <div key={paymentType.paymentMethodId}>
          <h3>PaymentMethodId: {paymentType.paymentMethodId}</h3>
          <h3>Name: {paymentType.paymentMethodName}</h3>
          <button
            onClick={() => deletePaymentMethod(paymentType.paymentMethodId)}
          >
            Delete
          </button>
          <a href={"/admin/updatePaymentType/" + paymentType.paymentMethodId}>
            Update
          </a>
        </div>
      ))}
    </div>
  );
}
