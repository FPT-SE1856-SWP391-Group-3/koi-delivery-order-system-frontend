import React, { useState, useEffect } from "react";
import ProfileSidebar from "./ProfileCom/ProfileSidebar";
import "../css/Profilemanage.css";
import api from "../../../api/CallAPI";

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

  // Fetch userId from localStorage only for API calls
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  // Fetch user data using userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.get("Users/" + userId);
        if (data.success) {
          setUserData(data.user || {});
        } else {
          alert("Lấy thông tin người dùng thất bại!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("An error occurred while fetching user data. Please try again.");
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated user data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.put("Users/" + userId, userData);
      if (data.success) {
        alert("Cập nhật thành công!");
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating. Please try again.");
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Static username for display (replace with userData.fullName if dynamic is needed)
  const username = userData.fullName || "User";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`;

  return (
    <div className="app-container">
      <div className="Orsidebar">
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="/CreateOrder">Create Order</a></li>
            <li><a href="/Profilemanage">Manage Account</a></li>
            <li><a href="/AddPayment">Add Payment</a></li>
          </ul>
        </nav>
      </div>

      {/* Navbar section */}
      <nav className="navbar-create">
        <h1>KOI DELIVERY</h1>

        {/* Username section with dropdown */}
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
                value={userData.fullName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={userData.email || ""} readOnly />
              <a href="#" onClick={() => alert("Change email functionality")}>Thay đổi</a>
            </div>
            <div>
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber || ""}
                onChange={handleChange}
              />
              <a href="#" onClick={() => alert("Change phone number functionality")}>Thay đổi</a>
            </div>
            <div>
              <label>Ngày sinh</label>
              <input
                type="date"
                name="birthDate"
                value={userData.birthDate || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Chứng minh thư/ Mã số thuế</label>
              <input
                type="text"
                name="idNumber"
                value={userData.idNumber || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Địa chỉ thường trú/ Địa chỉ xuất hóa đơn</label>
              <input
                type="text"
                name="address"
                value={userData.address || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Chuyển đổi loại dịch vụ</label>
              <select
                name="serviceType"
                value={userData.serviceType || "domestic"}
                onChange={handleChange}
              >
                <option value="domestic">Chuyển phát trong nước (Miễn phí thu hộ)</option>
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
