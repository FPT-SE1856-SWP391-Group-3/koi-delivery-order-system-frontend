import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReceiverInfo from "./COC/ReceiverInfo";
import SenderInfo from "./COC/SenderInfo";
import ServiceSelection from "./COC/ServiceSelection";
import "../css/CreateOrder.css";

import api from "../../../api/CallAPI";
import CustomerDocumentInfo from "./COC/CustomerDocumentInfo";

function CreateOrder() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [senderInfo, setSenderInfo] = useState({});
  const [receiverInfo, setReceiverInfo] = useState({});
  const [serviceSelection, setServiceSelection] = useState([{}]);
  const [customerDocument, setCustomerDocument] = useState([{}]);

  const [serviceSelectionState, setServiceSelectionState] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const savedOrderData = JSON.parse(localStorage.getItem("orderData"));
    if (savedOrderData) {
      setSenderInfo(savedOrderData.senderInfo || {});
      setReceiverInfo(savedOrderData.receiverInfo || {});
      setServiceSelection(savedOrderData.serviceSelection || {});
      setCustomerDocument(savedOrderData.customerDocument || {});
    }
  }, []);

  function handleServiceSelectionChange() {
    setServiceSelectionState(!serviceSelectionState);
  }

  useEffect(() => {
    let total = 0;
    serviceSelection.map((service) => {
      total += service.price * service.amount;
    });
    setTotalPrice(total);
  }, [serviceSelection]);



  const handleCheckboxChange = useCallback(() => {
    setIsCheckboxChecked((prevChecked) => !prevChecked);
  }, []);

  const username = "đăng khoa";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`;

  const handleSubmitClick = useCallback(() => {
    // const formData = {
    //   senderInfo,
    //   receiverInfo,
    //   serviceSelection,
    //   additionalNotes,
    // };
    // localStorage.setItem("orderData", JSON.stringify(formData));
    // navigate("/ChoosePayment");
    const formData = new FormData();

    formData.append("CustomerId", senderInfo.userId || null);
    formData.append("OrderStatusId", 1);
    formData.append("ShippingMethodId", 1);
    formData.append("StartAddress", "Bãi cỏ KTX khu B, Phường Đông Hòa, Dĩ An, Tỉnh Bình Dương, Việt Nam");
    formData.append("ReceiverPartAddressLine", receiverInfo.receiverPartAddressLine);
    formData.append("ReceiverFullAddressLine", receiverInfo.receiverFullAddressLine);
    formData.append("ReceiverName", receiverInfo.fullName);
    formData.append("ReceiverPhoneNumber", receiverInfo.phoneNumber);
    formData.append("ReceiverEmail", receiverInfo.email);

    serviceSelection.map((service, index) => {
      formData.append(`KoiName[${index}]`, service.koiName);
      formData.append(`KoiWeight[${index}]`, service.weight);
      formData.append(`KoiPrice[${index}]`, service.price);
      formData.append(`Amount[${index}]`, service.amount);
      formData.append(`KoiCondition[${index}]`, service.koiCondition);
    });

    customerDocument.map((doc, index) => {
      if (doc.customerDocumentFile) {
        formData.append(`CustomerDocumentFile`, doc.customerDocumentFile);
        formData.append(`Description[${index}]`, doc.description);   
      }
    });

    api.postForm("Orders", formData).then((data) => {
      if (data.success) {
        alert("Đơn hàng đã được tạo thành công!");
      } else {
        alert("Đơn hàng chưa được tạo, vui lòng thử lại!");
      }
    }); 



  }, [senderInfo, receiverInfo, serviceSelection, customerDocument, navigate]);

  const handleSaveClick = useCallback(() => {
    const formData = {
      senderInfo,
      receiverInfo,
      serviceSelection,
      customerDocument,
    };
    localStorage.setItem("orderData", JSON.stringify(formData));
    alert("Thông tin đơn hàng đã được lưu!");
  }, [senderInfo, receiverInfo, serviceSelection, customerDocument]);

  const handleResetClick = useCallback(() => {
    localStorage.removeItem("orderData");
    setSenderInfo({});
    setReceiverInfo({});
    setServiceSelection({});
    setCustomerDocument({});
    setIsCheckboxChecked(false);
    alert("Form đã được đặt lại!");
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
  };

  console.log(serviceSelection);
  console.log(customerDocument);
  console.log(totalPrice);
  console.log(serviceSelectionState);
  console.log(customerDocument);
  

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
          <ServiceSelection onChange={setServiceSelection} stateChange={handleServiceSelectionChange} />
          <CustomerDocumentInfo onChange={setCustomerDocument} />
        </div>

        {/* Footer */}
        <footer>
          <div className="footer-content">
            <div className="footer-summary">
              <span>Total Freight: 0 đ</span>
              <span>Total Cost: {totalPrice} đ</span>
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
