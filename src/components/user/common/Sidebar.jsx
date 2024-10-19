import React from "react";
import "../css/Sidebar.css";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <>
      <div className="sidebar">
        <div className="header">
          <h2>Admin</h2>
          <button className="logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
        <a href="/admin/manage-user">Manage User</a>
        <a href="/admin/manage-koi">Manage Koi</a>
        <a href="/admin/manage-order-service-detail">
          Manage Order System Detail
        </a>
        <a href="/admin/manage-payment-type">Manage Payment Type</a>
        <a href="/admin/manage-faq">Manage Faq</a>
        <a href="/admin/manage-order">Manage Order</a>
        <a href="/admin/manage-transportation-report">Manage Report</a>
        <a href="/admin/manage-blog-news">Manage Blog News</a>
        <a href="/admin/manage-certification">Manage Certification</a>
        <a href="/admin/manage-order-document">Manage Order Document</a>
      </div>
    </>
  );
}
