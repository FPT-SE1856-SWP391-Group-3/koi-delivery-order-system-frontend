import React from "react";
import "../../css/Profilemanage.css"
const ProfileSidebar = () => {
  return (
    <div className="Prosidebar">
      <a className="Prosidebar-item active">Thông tin tài khoản</a>
      <a className="Prosidebar-item">Đổi mật khẩu tài khoản</a>

      <a className="Prosidebar-item">Cài đặt thông tin người gửi</a>

      <a className="Prosidebar-item">Cài đặt tạo đơn</a>

      <a className="Prosidebar-item">Danh sách hàng hóa</a>

      <a className="Prosidebar-item">Tài khoản thanh toán</a>
      <a className="Prosidebar-item">Quản lý token</a>
    </div>
  );
};

export default ProfileSidebar;
