import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "./COC/OrderSummary";
import ReceiverInfo from "./COC/ReceiverInfo";
import SenderInfo from "./COC/SenderInfo";
import ServiceSelection from "./COC/ServiceSelection";
import "../css/CreateOrder.css";

function CreateOrder() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [senderInfo, setSenderInfo] = useState({});
  const [receiverInfo, setReceiverInfo] = useState({});
  const [serviceSelection, setServiceSelection] = useState({});
  const [additionalNotes, setAdditionalNotes] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedOrderData = JSON.parse(localStorage.getItem("orderData"));
    if (savedOrderData) {
      setSenderInfo(savedOrderData.senderInfo || {});
      setReceiverInfo(savedOrderData.receiverInfo || {});
      setServiceSelection(savedOrderData.serviceSelection || {});
      setAdditionalNotes(savedOrderData.additionalNotes || "");
    }
  }, []);

  const handleCheckboxChange = useCallback(() => {
    setIsCheckboxChecked((prevChecked) => !prevChecked);
  }, []);

  const username = "đăng khoa";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`;

  const handleSubmitClick = useCallback(() => {
    const formData = {
      senderInfo,
      receiverInfo,
      serviceSelection,
      additionalNotes,
    };
    localStorage.setItem("orderData", JSON.stringify(formData));
    navigate("/ChoosePayment");
  }, [senderInfo, receiverInfo, serviceSelection, additionalNotes, navigate]);

  const handleSaveClick = useCallback(() => {
    const formData = {
      senderInfo,
      receiverInfo,
      serviceSelection,
      additionalNotes,
    };
    localStorage.setItem("orderData", JSON.stringify(formData));
    alert("Thông tin đơn hàng đã được lưu!");
  }, [senderInfo, receiverInfo, serviceSelection, additionalNotes]);

  const handleResetClick = useCallback(() => {
    localStorage.removeItem("orderData");
    setSenderInfo({});
    setReceiverInfo({});
    setServiceSelection({});
    setAdditionalNotes("");
    setIsCheckboxChecked(false);
    alert("Form đã được đặt lại!");
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar-create">
        <h1>KOI DELIVERY</h1>
        <div className="username" onClick={toggleDropdown}>
          {username}
          <img src={avatarUrl} alt="User Avatar" className="user-avatar" />
          <span className="dropdown-icon">&#9662;</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="/Profilemanage">Cài đặt tài khoản</a>
              <a href="/UpdatePassword">Reset Password</a>
              <a href="/logout">Đăng xuất</a>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div>
        <nav className="Orsidebar">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/CreateOrder">Create Order</a></li>
            <li><a href="/Profilemanage">Manage Account</a></li>
            <li><a href="/AddPayment">Add Payment</a></li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <header>
          <a className="order-btn-Do" href="/CreateOrder">Create Domestic Order</a>
          <a className="order-btn" href="/CreateOrderInter">Create International Order</a>
        </header>

        {/* Form Sections */}
        <div className="form-sections">
          <SenderInfo onChange={setSenderInfo} />
          <ReceiverInfo onChange={setReceiverInfo} />
          <ServiceSelection onChange={setServiceSelection} />
          <OrderSummary onChange={(notes) => setAdditionalNotes(notes)} />
        </div>

        {/* Footer */}
        <footer>
          <div className="footer-content">
            <div className="footer-summary">
              <span>Total Freight: 0 đ</span>
              <span>Total Cost: 0 đ</span>
              <span>Estimated Delivery: Same Day</span>
            </div>
            <div className="buttonNprivacy">
              <div className="privacy">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                  />
                  Tôi đã đọc và đồng ý với Điều khoản quy định
                </label>
              </div>
              <div className="footer-actions">
                <button className="submit-btn" disabled={!isCheckboxChecked} onClick={handleSubmitClick}>
                  Submit
                </button>
                <button className="save-btn" onClick={handleSaveClick}>Save</button>
                <button className="reset-btn" onClick={handleResetClick}>Reset</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default CreateOrder;