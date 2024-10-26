import React from "react";
import "../../css/CreateOrder.css";
const ReceiverInfo = () => {
  return (
    <div className="section">
      <h2>Receiver Information</h2>
      <div className="sectionCompo">
      <label>Phone</label>
      <input type="text" placeholder="Enter phone number" />
      <label>Full Name</label>
      <input type="text" placeholder="Enter full ame" />
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
