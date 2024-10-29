import React, { Component } from "react";
import "../css/Sidebar.css";
import ComponentPath from "routes/ComponentPath";

export default function UserSidebar() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <>
      <div className="sidebar">
        <div className="header">
          <h2>User</h2>
          <a href="/logout" className="logout-btn">
            Log Out
          </a>
        </div>
        <a href={ComponentPath.user.profile.viewProfile}>My Profile</a>
        <a href={ComponentPath.user.order.createOrder}>Create Order</a>
        <a href={ComponentPath.user.order.viewOrder}>View Order</a>
        <a href={ComponentPath.user.notification.viewNotification}>
          View Notification
        </a>
      </div>
    </>
  );
}
