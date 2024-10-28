import React from "react";
import "../../css/CreateOrder.css";

const ServiceSelection = () => {
  return (
    <div className="section">
      <h2>Service Selection</h2>
      <div className="sectionCompo">
        <label>Package Type</label>
        <input type="text" placeholder="Enter package type" />
        <label>Dimensions</label>
        <div className="dimensions">
          <input type="text" placeholder="Length (cm)" />
          <input type="text" placeholder="Width (cm)" />
          <input type="text" placeholder="Height (cm)" />
        </div>
        <div className="special-item-properties">
          <h3>
            <i className="icon-cart"></i> Tính Chất Hàng Hóa Đặc Biệt{" "}
       
          </h3>
          <div className="checkbox-grid">
            <label>
              <input type="checkbox" />
              Giá trị cao
            </label>
            <label>
              <input type="checkbox" />
              Dễ vỡ
            </label>
            <label>
              <input type="checkbox" />
              Quá khổ
            </label>
            <label>
              <input type="checkbox" />
              Chất lỏng
            </label>
            <label>
              <input type="checkbox" />
              Hàng lạnh
            </label>
            <label>
              <input type="checkbox" />
              Nguyên khối
            </label>
            <label>
              <input type="checkbox" />
              Từ tính, Pin
            </label>
          </div>
        </div>

        <label>Total Weight</label>
        <input type="text" placeholder="0 kg" />
        <label>Value</label>
        <input type="text" placeholder="0đ" />
        <button>Add Package</button>
      </div>
    </div>
  );
};

export default ServiceSelection;