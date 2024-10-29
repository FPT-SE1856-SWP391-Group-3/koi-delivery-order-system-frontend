import React, { useState } from 'react';
// import "../css/EditProfile.css"
const Updateinfo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    idNumber: '',
    address: '',
    serviceType: 'Chuyển phát trong nước (Miễn phí thu hộ)',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="account-settings">
      <h2>Cấu hình tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên khách hàng, công ty</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nguyễn Hồ Trường Thành"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Ngày sinh</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Chứng minh thư/ Mã số thuế</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Địa chỉ thường trú/ Địa chỉ xuất hóa đơn</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Chuyển đổi loại dịch vụ</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
          >
            <option value="Chuyển phát trong nước (Miễn phí thu hộ)">
              Chuyển phát trong nước (Miễn phí thu hộ)
            </option>
            <option value="Chuyển phát quốc tế">Chuyển phát quốc tế</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <button type="submit">cập nhật </button>
      </form>
    </div>
  );
};

export default Updateinfo;
