import api from "../../../api/CallAPI";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../user/UpdateUser.css";

export default function UpdateUser() {
  const [updateUser, setUpdateUser] = useState({});
  console.log(updateUser);

  const navigate = useNavigate();
  const { id } = useParams();

  //Lay thong tin nguoi dung
  useEffect(() => {
    try {
      api.get("Users/" + id).then((data) => {
        if (data.success) {
          setUpdateUser(data.user);
          console.log(data.user);
        } else {
          alert("Lấy thông tin người dùng thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  }, []);

  //Cap nhat thong tin nguoi dung
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      api.put("Users/" + id, updateUser).then((data) => {
        if (data.success) {
          alert("Cập nhật thành công!");
          navigate("/admin/manage-user");
        } else {
          alert("Cập nhật thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <>
      <a className="back-button" href="/admin/manage-user">
        Back
      </a>
      <div className="update-container">
        <h1 className="form-title"> Update Profile</h1>
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={updateUser.userName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, userName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={updateUser.fullName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, fullName: e.target.value })
              }
            />
          </div>
          <div className="form-group ">
            <label htmlFor="email">Email</label>
            <input
              className="manage_email"
              type="email"
              id="email"
              name="email"
              value={updateUser.email}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={updateUser.phoneNumber}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, phoneNumber: e.target.value })
              }
            />
          </div>
          {/*<div>*/}
          {/*    <label htmlFor="confirmPassword">Confirm Password</label>*/}
          {/*    <input type="password" id="confirmPassword" name="confirmPassword" />*/}
          {/*</div>*/}
          <button type="submit" className="btn-update">
            UPDATE
          </button>
        </form>
      </div>
    </>
  );
}
