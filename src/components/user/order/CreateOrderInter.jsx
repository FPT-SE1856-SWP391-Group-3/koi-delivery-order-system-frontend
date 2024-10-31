import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "./COIC/OrderSummary";
import ReceiverInfo from "./COIC/ReceiverInfo";
import SenderInfo from "./COC/SenderInfo";
import ServiceSelection from "./COC/ServiceSelection.jsx";
import api from "../../../api/CallAPI"; // Adjust the import path for your API calls
import "../css/CreateOrder.css";
import UserSideNav from "../UserSideNav";

function CreateOrderInter() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [senderInfo, setSenderInfo] = useState({});
  const [receiverInfo, setReceiverInfo] = useState({});
  const [serviceSelection, setServiceSelection] = useState({});
  const [additionalNotes, setAdditionalNotes] = useState("");
  
  const navigate = useNavigate();

  // Fetch userId from localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  // Fetch user data using userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.get("Users/" + userId);
        if (data.success) {
          setUserData(data.user || {});
        } else {
          alert("Failed to retrieve user information!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("An error occurred while fetching user data. Please try again.");
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleCheckboxChange = useCallback(() => {
    setIsCheckboxChecked((prevChecked) => !prevChecked);
  }, []);

  // Dynamic username for display
  const username = userData.fullName || "User";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`;

  const handleSubmitClick = useCallback(() => {
    const formData = new FormData();

    // Map sender info
    formData.append("CustomerId", userData.customerId || null);
    formData.append("OrderStatusId", senderInfo.orderStatusId || null);
    formData.append("ShippingMethodId", senderInfo.shippingMethodId || null);
    formData.append("PaymentHistoryId", senderInfo.paymentHistoryId || null);
    formData.append("OrderDate", senderInfo.orderDate || null);
    formData.append("DeliveryDate", senderInfo.deliveryDate || null);
    formData.append("StartAddress", senderInfo.startAddress || "Default address");

    // Map receiver info
    formData.append("ReceiverName", receiverInfo.fullName);
    formData.append("ReceiverPhoneNumber", receiverInfo.phoneNumber);
    formData.append("ReceiverEmail", receiverInfo.email || "");
    formData.append("ReceiverPartAddressLine", receiverInfo.addressLine || "");
    formData.append("ReceiverFullAddressLine", `${receiverInfo.city}, ${receiverInfo.district}, ${receiverInfo.ward}, ${receiverInfo.address}`);

    // Map service selection data
    serviceSelection.packages.forEach((pkg, index) => {
      formData.append(`KoiId[${index}]`, pkg.koiId || "");
      formData.append(`Amount[${index}]`, pkg.amount || "");
      formData.append(`KoiCondition[${index}]`, pkg.condition || "");
    });

    // Map customer documents
    serviceSelection.documents.forEach((doc, index) => {
      formData.append(`UploadDate[${index}]`, doc.uploadDate || "");
      formData.append(`Description[${index}]`, doc.description || "");
      formData.append(`CustomerDocumentFile[${index}]`, doc.file);
    });

    // Map additional notes from OrderSummary
    formData.append("AdditionalNotes", additionalNotes);

    // Save to localStorage
    localStorage.setItem("orderFormData", JSON.stringify(Object.fromEntries(formData)));

    // Navigate to ChoosePayment page
    navigate("/ChoosePayment");
  }, [userData, senderInfo, receiverInfo, serviceSelection, additionalNotes, navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
  };

  return (
    <UserSideNav>
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
          <SenderInfo onChange={setSenderInfo} />
          <ReceiverInfo onChange={setReceiverInfo} />
          <ServiceSelection onChange={setServiceSelection} />
          <OrderSummary onChange={(notes) => setAdditionalNotes(notes)} />
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
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                  />
                  Tôi đã đọc và đồng ý với{" "}
                  <strong className="Confirm-privacy">
                    Điều khoản quy định
                  </strong>
                </label>
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
    </UserSideNav>
  );
}

export default CreateOrderInter;