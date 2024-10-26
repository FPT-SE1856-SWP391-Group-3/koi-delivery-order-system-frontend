import React from "react";
import "../../css/CreateOrder.css";

const ReceiverInfo = () => {
  return (
    <div className="section">
      <h2>Receiver Information</h2>
      <div className="sectionCompo">
        <label>Phone</label>
        <div className="phone-input">
          <select>
            <option value="+81">+81 Japan</option>
            <option value="+84">+84 Vietnam</option>
            <option value="+1">+1 USA</option>
            <option value="+44">+44 UK</option>
            {/* Add more options as needed */}
          </select>
          <input type="text" placeholder="Enter phone number" />
        </div>

        <label>Full Name</label>
        <input type="text" placeholder="Enter full name" />
        
        <label>Address</label>
        <input type="text" placeholder="Enter detailed address" />
        
        <label>City/Province</label>
        <input type="text" placeholder="Enter city" />
        
        <label>District/Ward</label>
        <input type="text" placeholder="Enter district" />
      </div>
    </div>
  );
};

export default ReceiverInfo;
