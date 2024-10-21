import React, { Component } from "react";
import "../css/Sidebar.css";
import ComponentPath from "routes/ComponentPath";

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
        <a href={ComponentPath.admin.user.manageUser}>Manage User</a>
        <a href={ComponentPath.admin.koi.manageKoi}>Manage Koi</a>
        <a href={ComponentPath.admin.order.service.manageOrderService}>
          Manage Order System Detail
        </a>
        <a href={ComponentPath.admin.payment.managePaymentType}>Manage Payment Type</a>
        <a href={ComponentPath.admin.faq.manageFaq}>Manage Faq</a>
        <a href={ComponentPath.admin.order.manageOrder}>Manage Order</a>
        <a href={ComponentPath.admin.report.manageReport}>Manage Report</a>
        <a href={ComponentPath.admin.blogNews.manageBlogNews}>Manage Blog News</a>
        <a href={ComponentPath.admin.certification.manageCertification}>Manage Certification</a>
        <a href={ComponentPath.admin.order.document.manageOrderDocument}>Manage Order Document</a>
      </div>
    </>
  );
}
