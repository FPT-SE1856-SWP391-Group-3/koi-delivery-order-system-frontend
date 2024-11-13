import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../css/CreateOrder.css";
import api from "../../../../api/CallAPI";
import { Button, Divider } from "@mui/material";

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
    <div>
      <h2>Customer Document</h2>
      <div className="sectionCompo"></div>
      <div>
        {customerDocument.map((item, index) => (
          <>
            <div key={index}>
              <Divider sx={{marginBlock: "1em"}}/>
              <label>Document {index + 1}</label>
              <input
                type="file"
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "customerDocumentFile",
                    e.target.files[0]
                  )
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
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={() => handleRemoveDocument(index)}
              >
                Xóa
              </Button>
            </div>
          </>
        ))}
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleAddDocument}
          sx={{ mt: "1em" }}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
};

// Xác nhận prop types
CustomerDocumentInfo.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CustomerDocumentInfo;
