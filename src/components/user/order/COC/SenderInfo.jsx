import React from "react";
import "../../css/CreateOrder.css";
const SenderInfo = () => {
  return (
    <div className="section">
      <h2>Sender Information</h2>
      <div className="sectionCompo">
        <label>Sender Name</label>
        <input type="text" placeholder="Enter sender name" />

        <div>
          <label>Ngày sinh</label>
          <input type="date" />
        </div>
      </div>
    </div>
  );
};

export default SenderInfo;
