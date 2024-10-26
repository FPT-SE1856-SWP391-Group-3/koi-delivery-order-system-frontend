import React, { useState, useEffect } from "react";
import ProfileSidebar from "./ProfileCom/ProfileSidebar";
import "../css/Profilemanage.css";
import api from "../../../api/CallAPI"; // Ensure your API helper is set up correctly

function Profilemanage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    idNumber: "",
    address: "",
    serviceType: "domestic",
  });

  const userId = JSON.parse(localStorage.getItem("userId")); // Assuming the userId is stored in localStorage

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/Users/${userId}`);
        setUserData({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          birthDate: response.data.birthDate || "",
          idNumber: response.data.idNumber || "",
          address: response.data.address || "",
          serviceType: response.data.serviceType || "domestic",
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit updated user data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/Users/${userId}`, userData);
      if (response.status === 200) {
        alert("Thông tin đã được cập nhật!");
      }
    } catch (error) {
      console.error("Failed to update user data:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // User name to generate avatar
  const username = "Nguyễn Hồ Trường Thành";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`;

  return (
    <div className="app-container">
      <div className="Orsidebar">
        <nav>
          <ul>
            <li>
              <a href="#home">Home</a>
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

      {/* Main content */}
      <div className="Promain-content">
        <div className="account-settings">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Tên khách hàng, công ty</label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={userData.email} readOnly />
              <a href="#">Thay đổi</a>
            </div>
            <div>
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
              />
              <a href="#">Thay đổi</a>
            </div>
            <div>
              <label>Ngày sinh</label>
              <input
                type="date"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Chứng minh thư/ Mã số thuế</label>
              <input
                type="text"
                name="idNumber"
                value={userData.idNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Địa chỉ thường trú/ Địa chỉ xuất hóa đơn</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Chuyển đổi loại dịch vụ</label>
              <select
                name="serviceType"
                value={userData.serviceType}
                onChange={handleInputChange}
              >
                <option value="domestic">
                  Chuyển phát trong nước (Miễn phí thu hộ)
                </option>
              </select>
            </div>
            <button type="submit" className="save-button">
              Lưu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profilemanage;
