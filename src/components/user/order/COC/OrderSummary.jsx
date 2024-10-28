import React from "react";
import PropTypes from "prop-types";
import "../../css/CreateOrder.css";

const OrderSummary = ({ onChange }) => {
  return (
    <div className="section">
      <h2>Additional Notes</h2>
      <div className="sectionCompo">
        <textarea
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter any additional notes"
        />
      </div>
    </div>
  );
};

// Xác nhận prop types
OrderSummary.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default OrderSummary;
