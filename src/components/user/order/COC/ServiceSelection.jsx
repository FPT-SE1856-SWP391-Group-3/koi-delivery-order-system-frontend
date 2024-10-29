import React, { useEffect, useState } from "react";
import "../../css/CreateOrder.css";
import api from "../../../../api/CallAPI";
import PropTypes from "prop-types";

const ServiceSelection = ({ onChange }) => {
  const [orderServiceDetails, setOrderServiceDetails] = useState([]);
  const [itemList, setItemList] = useState([
    { koiName: "", weight: "", price: "", amount: "", koiCondition: "" },
  ]);

  useEffect(() => {
    api.get("OrderServiceDetails/").then((data) => {
      if (data.success) {
        console.log(data.orderServiceDetails);
        setOrderServiceDetails(data.orderServiceDetails);
      } else {
        console.log("Không có dịch vụ!");
      }
    });
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedItemList = [...itemList];
    updatedItemList[index][field] = value;
    setItemList(updatedItemList);
    onChange(updatedItemList);
  };

  const handleAddItem = () => {
    setItemList([
      ...itemList,
      { koiName: "", weight: "", price: "", amount: "", koiCondition: "" },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (itemList.length === 1) return;
    const updatedItemList = itemList.filter((_, i) => i !== index);
    setItemList(updatedItemList);
    onChange(updatedItemList);
  };

  return (
    <div className="section">
      <h2>Service Selection</h2>
      <div className="sectionCompo">
        {itemList.map((item, index) => (
          <div id="item" key={index}>
            <label>Package Type {index + 1}</label>
            <input
              type="text"
              placeholder="Enter package type."
              value={item.koiName}
              onChange={(e) => handleInputChange(index, "koiName", e.target.value)}
            />
            <label>Weight</label>
            <input
              type="text"
              placeholder="gram"
              value={item.weight}
              onChange={(e) => handleInputChange(index, "weight", e.target.value)}
            />
            <label>Price</label>
            <input
              type="text"
              placeholder="0đ"
              value={item.price}
              onChange={(e) => handleInputChange(index, "price", e.target.value)}
            />
            <label>Amount</label>
            <input
              type="text"
              placeholder="0"
              value={item.amount}
              onChange={(e) => handleInputChange(index, "amount", e.target.value)}
            />
            <label>Condition</label>
            <input
              type="text"
              placeholder="Enter condition"
              value={item.koiCondition}
              onChange={(e) => handleInputChange(index, "koiCondition", e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveItem(index)}>
              Xóa
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>
          Add Package
        </button>
        {orderServiceDetails.map((orderServiceDetail, idx) => (
          <div key={idx}>
            <h1>Các dịch vụ</h1>
            <p>Gía dịch vụ: {orderServiceDetail.orderServiceDetailName} </p>
            <p>Giá cước: {orderServiceDetail.orderServiceDetailPrice} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

ServiceSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
  stateChange: PropTypes.func.isRequired,
};

export default ServiceSelection;
