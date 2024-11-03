import React, { useEffect, useState, useMountEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../css/ChoosePayment.css"; // Import custom CSS
import ATMCard from "../../../assets/atm-icon.png";
import VisaCard from "../../../assets/visa-icon.png";
import COD from "../../../assets/COD-icon.png";
import { FaTimes } from "react-icons/fa"; // Import the icon for "X"
import api from "../../../api/CallAPI";

function useOnceCall(cb, condition = true) {
  const isCalledRef = React.useRef(false);

  React.useEffect(() => {
    if (condition && !isCalledRef.current) {
      isCalledRef.current = true;
      cb();
    }
  }, [cb, condition]);
}


function CallBackPayment() {
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [searchParams] = useSearchParams();
  const [responseCode, setResponseCode] = useState(searchParams.get("vnp_ResponseCode"));
  const [query, setQuery] = useState(window.location.search.substring(1));

  const navigate = useNavigate();

  // const handlePaymentChange = (e) => {
  //   setSelectedPayment(e.target.value);
  // };

  // const handlePaymentSubmit = () => {
  //   // alert(`You have selected ${selectedPayment} as your payment method.`);
  //   // navigate("/payment-success")
      
  //   const data = {
  //     orderId: orderId,
  //   };

  //   console.log(data);
  //   api.post("Payments/create-payment", data).then((data) =>{
  //     console.log(data)
  //     window.location.href  = data.paymentUrl;
  //   })

  // };

  // Function to handle back navigation
  // const handleBackClick = () => {
  //   // navigate(-1); // Go back to the previous page
  //   navigate("")
  // };

  const apiOneTimePayment = () => {
    api.post(`Payments/payment-callback?${query}`).then((data) => {
      console.log(data);
      setResponseCode(data.vnp_ResponseCode);
    });
  };

  useOnceCall(apiOneTimePayment);
  

  return (
    <div className="payment-container">
      {/* Back button with X icon */}
      {/* <button className="back-btn" onClick={handleBackClick}>
        <FaTimes className="back-icon" />
      </button> */}

      <h2>Tình trạng thanh toán</h2>
        <h1>{
            responseCode === "00" ? "Thanh toán thành công" : "Thanh toán thất bại"
          }</h1>
    </div>
  );
}

export default CallBackPayment;
