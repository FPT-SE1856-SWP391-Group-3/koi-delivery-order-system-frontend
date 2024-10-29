import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import api from "../../../api/CallAPI";
import "../order/CreateOrderDocument.css";

export default function CreateOrderDocument({
  orderId,
  orderStatusId,
  onClose,
  onAddSuccess,
}) {
  const { control, register, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderDocuments",
  });

  const onSubmit = async (data) => {
    try {
      data.orderDocuments.forEach(async (orderDocument) => {
        const orderData = new FormData();
        orderData.append("orderId", orderId);
        orderData.append("orderStatusId", orderStatusId);
        orderData.append("orderDocumentFile", orderDocument.filePath[0]);
        orderData.append("description", orderDocument.description);

        const response = await api.postForm("OrderDocuments/", orderData);
        if (response.success) {
          console.log("Document uploaded successfully!");
        } else {
          alert("Failed to add document!");
        }
      });
      alert("All documents added successfully!");
      onAddSuccess(); // Cập nhật danh sách sau khi thêm thành công
      onClose(); // Đóng modal
    } catch (error) {
      console.error("Error:", error);
      alert("Error! Please try again.");
    }
  };

  return (
    <div className="adddocument-container">
      <h1 className="form-title">Add New Document</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="add-form">
        <div className="form-group">
          <label>OrderId</label>
          <input type="number" value={orderId} readOnly />
        </div>
        <div className="form-group">
          <label>OrderStatusId</label>
          <input type="number" value={orderStatusId} readOnly />
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="document-entry">
            <div className="form-group">
              <input
                id="filePath"
                name="filePath"
                type="file"
                accept="multipart/form-data"
                {...register(`orderDocuments.${index}.filePath`)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea {...register(`orderDocuments.${index}.description`)} />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({})}
          className="btn-add-document"
        >
          Add Document
        </button>
        <button type="submit" className="btn-submit">
          ADD
        </button>
      </form>
    </div>
  );
}
