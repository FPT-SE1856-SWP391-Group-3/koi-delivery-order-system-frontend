import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import OrderSummary from "./COIC/OrderSummary";
import ReceiverInfo from "./COIC/ReceiverInfo";
import SenderInfo from "./COC/SenderInfo";
import ServiceSelection from "./COC/ServiceSelection.JSX";
import "../css/CreateOrder.css";

function CreateOrderInter() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Add useNavigate for redirection

  const handleCheckboxChange = useCallback(() => {
    setIsCheckboxChecked((prevChecked) => !prevChecked);
  }, []);

  const username = "đăng khoa";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username
  )}&background=0D8ABC&color=fff`;

  // Redirect to payment page on submit
  const handleSubmitClick = useCallback(() => {
    navigate("/ChoosePayment"); // Redirect to the payment selection page
  }, [isCheckboxChecked, navigate]);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="app-container">
      <div>
        <nav className="Orsidebar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/CreateOrder">Create Order</a>
            </li>
            <li>
              <a href="/Profilemanage">Manage Account</a>
            </li>
            <li>
              <a href="/AddPayment">Add Payment</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Navbar section */}
      <nav className="navbar-create">
        <h1>KOI DELIVERY</h1>

        {/* Username with dropdown */}
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

      <div>
        <div className="main-content">
          <header>
            <a className="order-btn" href="/CreateOrder">
              Create Domestic Order
            </a>
            <a className="order-btn-In" href="/CreateOrderInter">
              Create International Order
            </a>
          </header>

          <div className="form-sections">
            <SenderInfo />
            <ReceiverInfo />
            <ServiceSelection />
            <OrderSummary />
          </div>

          <footer>
            <div className="footer-content">
              <div className="footer-summary">
                <span>Total Freight: 0 đ</span>
                <span>Total cost: 0 đ</span>
                <span>Estimated Delivery: Same Day</span>
              </div>
              <div className="buttonNprivacy">
                <div className="privacy">
                  <div>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={isCheckboxChecked}
                        onChange={handleCheckboxChange}
                      />
                    </label>
                  </div>
                  <div className="privacy">
                    Tôi đã đọc và đồng ý với{" "}
                    <strong className="Confirm-privacy">
                      Điều khoản quy định
                    </strong>
                  </div>
                </div>
                <div className="footer-actions">
                  <button
                    className="submit-btn"
                    disabled={!isCheckboxChecked}
                    onClick={handleSubmitClick}
                  >
                    Submit
                  </button>
                  <button className="save-btn">Save</button>
                  <button className="reset-btn">Reset</button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderInter;
