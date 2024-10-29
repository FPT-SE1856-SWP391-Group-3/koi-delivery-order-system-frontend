import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../css/CreateOrder.css";
import api from "../../../../api/CallAPI";

const CustomerDocumentInfo = ({ onChange }) => {
  const [customerDocument, setCustomerDocument] = useState([
    { customerDocumentFile: null, description: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedDocuments = [...customerDocument];
    updatedDocuments[index][field] = value;
    setCustomerDocument(updatedDocuments);
    onChange(updatedDocuments);
  };

  const handleAddDocument = () => {
    setCustomerDocument([
      ...customerDocument,
      { customerDocumentFile: null, description: "" },
    ]);
  };

  const handleRemoveDocument = (index) => {
    if (customerDocument.length === 1) return;
    const updatedDocuments = customerDocument.filter((_, i) => i !== index);
    setCustomerDocument(updatedDocuments);
    onChange(updatedDocuments);
  };

  return (
    <div className="section">
      <h2>Additional Notes</h2>
      <div className="sectionCompo">
        <textarea
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter any additional notes"
        />
      </div>
      <div>
        {customerDocument.map((item, index) => (
          <div key={index}>
            <label>Customer Document</label>
            <input
              type="file"
              onChange={(e) =>
                handleInputChange(index, "customerDocumentFile", e.target.files[0])
              }
            />
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={item.description}
              onChange={(e) =>
                handleInputChange(index, "description", e.target.value)
              }
            />
            <button type="button" onClick={() => handleRemoveDocument(index)}>
              Xóa
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddDocument}>
          Thêm
        </button>
      </div>
    </div>
  );
};

// Xác nhận prop types
CustomerDocumentInfo.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CustomerDocumentInfo;
