import React from "react";
import PropTypes from "prop-types";
import "../../css/CreateOrder.css";
import { useEffect, useState } from "react";
import api from "../../../../api/CallAPI";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

const OrderSummary = ({ onChange }) => {

  const { register, control, watch } = useForm({
    defaultValues: {
      customerDocument: { customerDocumentFile: null, description: "" },
    }
  });

  const {
    fields: customerDocumentField,
    append: customerDocumentAppend,
    remove: customerDocumentRemove,
  } = useFieldArray({
    control,
    name: "customerDocument",
  });

  function insertItem() {
    onChange(watch("customerDocument"));
  }


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
        {customerDocumentField.map((item, index) => (
          <>
            <div key={index}>
              <label>Customer Document</label>
              <input
                type="file"
                {...register(`customerDocument.${index}.customerDocumentFile`)}
                onChange={insertItem}
              />
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter description"
                {...register(`customerDocument.${index}.description`)}
                onChange={insertItem}
              />
            </div>
            <button type="button" onClick={() => customerDocumentRemove(index)}>
              Xóa
            </button>
          </>
        ))}
        <button
          type="button"
          onClick={() =>
            customerDocumentAppend({
              customerDocumentFile: null,
              description: "",
            })
          }
        >
          Thêm
        </button>
      </div>
    </div>
  );
};

// Xác nhận prop types
OrderSummary.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default OrderSummary;