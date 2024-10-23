import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import ComponentPath from "routes/ComponentPath";
import styled from "styled-components";
import InforColumn from "../props/InforColumn";
import UserSidebar from "../common/UserSidebar";
import Bootstrap from "../props/Bootstrap";
export default function ViewProfile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

 

  //Xoa nguoi dung
  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      api.del("Users").then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          localStorage.removeItem("user");
          navigate("/");
        } else {
          alert("Xóa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <>
      <Bootstrap/>
      <UserSidebar/>
      <div className="content">
        {/* <h1>View Profile</h1>
        <table>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>{user.userName}</td>
            </tr>
            <tr>
              <td>UserId:</td>
              <td>{user.userId}</td>
            </tr>
            <tr>
              <td>PhoneNumber:</td>
              <td>{user.phoneNumber}</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td>{user.roleName}</td>
            </tr>
            <tr>
              <td>Update:</td>
              <td>
                <td>
                  <a>Update</a>
                </td>
              </td>
            </tr>
            <tr>
              <td>Delete:</td>
              <td>
                <button >Delete</button>
              </td>
            </tr>
            <tr>
              <td>View Address:</td>
              <td>
                <a >
                  View Address
                </a>
              </td>
            </tr>
          </tbody>
        </table> */}
        <div>
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width={150}
                    />
                    <div className="mt-3">
                      <h4>John Doe</h4>
                      <p className="text-secondary mb-1">
                        Full Stack Developer
                      </p>
                      <p className="text-muted font-size-sm">
                        Bay Area, San Francisco, CA
                      </p>
                      <a className="btn btn-primary"  href={ComponentPath.user.payment.viewPayment} >View Payment</a>
                      <a className="btn btn-primary"  href={ComponentPath.user.profile.editProfile} >Update Profile</a>
                      <button className="btn btn-outline-primary"  href={ComponentPath.user.profile.updatePassword}>
                        Update Password
                      </button>
                      <button className="btn btn-outline-primary"  onClick={deleteUser}>
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <InforColumn element="Full Name" value={user.fullName} />
                  <hr />
                  <InforColumn element="User Name" value={user.userName} />
                  <hr />
                  <InforColumn element="Phone" value={user.phoneNumber} />
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <a
                        className="btn btn-info "
                        target="__blank"
                        href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                      >
                        Edit
                      </a>
                      <a
                        className="btn btn-info "
                        target="__blank"
                        href={ComponentPath.user.address.viewAddress}
                      >
                        View Address
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
