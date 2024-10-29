import api from "../../../api/CallAPI";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../user/UpdateUser.css";

export default function UpdateUser({ userId, onUpdateSuccess }) {
  const [updateUser, setUpdateUser] = useState({});

  //Lay thong tin nguoi dung
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.get("Users/" + userId);
        if (data.success) {
          setUpdateUser(data.user);
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

  //Cap nhat thong tin nguoi dung
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.put("Users/" + userId, updateUser);
      if (data.success) {
        alert("Cập nhật thành công!");
        onUpdateSuccess();
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating. Please try again.");
    }
  };

  // Hàm cập nhật giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="update-container">
      <h1 className="form-title"> Update Profile</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            name="userName"
            value={updateUser.userName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullName"
            value={updateUser.fullName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={updateUser.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={updateUser.phoneNumber || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-update">
          UPDATE
        </button>
      </form>
    </div>
  );
}
