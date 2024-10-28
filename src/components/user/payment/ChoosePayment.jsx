import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ChoosePayment.css";
import ATMCard from "../../../assets/atm-icon.png";
import VisaCard from "../../../assets/visa-icon.png";
import COD from "../../../assets/COD-icon.png";
import { FaTimes } from "react-icons/fa"; // Import the icon for "X"

function ChoosePayment() {
  const orderData = JSON.parse(localStorage.getItem("orderData"));
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const navigate = useNavigate();

  // Extract sender and service information from orderData
  const { senderInfo, serviceSelection } = orderData;

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handlePaymentSubmit = () => {
    alert(`You have selected ${selectedPayment} as your payment method.`);
    navigate("/payment-success");
  };

  // Function to handle back navigation
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="payment-container">
      {/* Back button with X icon */}
      <button className="back-btn" onClick={handleBackClick}>
        <FaTimes className="back-icon" />
      </button>

      <h2>Hình thức thanh toán</h2>

      <form>
        <div className="payment-methods">
          {/* COD Payment Option */}
          <div>
            <input
              type="radio"
              id="COD"
              name="paymentMethod"
              value="COD"
              checked={selectedPayment === "COD"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="COD">
              <img src={COD} alt="COD" />
              Cash on delivery
            </label>
          </div>

          {/* ATM Payment Option */}
          <div>
            <input
              type="radio"
              id="atm"
              name="paymentMethod"
              value="ATM"
              checked={selectedPayment === "ATM"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="atm">
              <img src={ATMCard} alt="ATM" />
              Thẻ ATM nội địa (Hỗ trợ Internet Banking)
            </label>
          </div>

          {/* Visa Payment Option */}
          <div>
            <input
              type="radio"
              id="visa"
              name="paymentMethod"
              value="Visa"
              checked={selectedPayment === "Visa"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="visa">
              <img src={VisaCard} alt="Visa" />
              Thanh toán bằng thẻ quốc tế Visa, Master, JCB
            </label>
          </div>
        </div>

        {/* Customer Information Box */}
        <div className="customer-info">
          <h3>Thông tin khách hàng</h3>
          <p>
            <strong>{senderInfo.fullName}</strong> | {senderInfo.phoneNumber}
          </p>
          <p>Email: {senderInfo.email}</p>
        </div>

        {/* Order Summary Box */}
        <div className="order-summary">
          <h3>Thông tin đơn hàng</h3>
          {serviceSelection.map((pkg, index) => (
            <p key={index}>
              {pkg.type} - {pkg.weight} kg - {pkg.length} x {pkg.width} x {pkg.height} cm
            </p>
          ))}
          <p className="total">Thành tiền: 197,400 đ</p>
        </div>

        <div className="payment-footer">
          <button
            type="button"
            className="pay-now-btn"
            onClick={handlePaymentSubmit}
          >
            Thanh toán
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChoosePayment;
