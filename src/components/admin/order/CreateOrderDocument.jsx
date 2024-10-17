import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";

export default function CreateOrderDocument() {
    const { control, register, handleSubmit } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "orderDocuments",
    });
    const navigate = useNavigate();
    let { orderId, orderStatusId } = useParams();

    const onSubmit = async (data) => {
        try {
            console.log(data.orderDocuments);
            data.orderDocuments.forEach((orderDocument, index) => {
                console.log(orderDocument);
                const orderData = new FormData();
                orderData.append("orderId", orderId);
                orderData.append("orderStatusId", orderStatusId);
                orderData.append("orderDocumentFile", orderDocument.filePath[0]);
                orderData.append("description", orderDocument.description);
                console.log(orderData);
                api.postForm("OrderDocuments/", orderData).then((data) => {
                    if (data.success) {
                        console.log(`File ${index + 1} uploaded successfully!`);
                        alert("Thêm thành công!");
                    } else {
                        console.log(`File ${index + 1} uploaded successfully!`);
                        alert("Thêm thất bại!");
                    }
                });
            });
        } catch (error) {
            console.error("Error :", error);
            alert("Error! Please try again.");
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center">Thêm Tài liệu mới</h2>
                        <div className="form-group">
                            <label htmlFor={`orderId`}>Mã đơn hàng</label>
                            <input
                                type="number"
                                className="form-control"
                                id={`orderId`}
                                name={`orderId`}
                                value={orderId}
                                readOnly
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                                        <label htmlFor={`orderStatusId`}>Mã trạng thái đơn hàng</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`orderStatusId`}
                                            name={`orderStatusId`}
                                            value={orderStatusId}
                                        />
                                    </div>
                            {fields.map((field, index) => (
                                <div key={field.id}>
                                   
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
                                        <label htmlFor="description">Mô tả</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            {...register(`orderDocuments.${index}.description`)}
                                        />
                                    </div>
                                    <button type="button" onClick={() => remove(index)}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => append({})}
                            >
                                Add document
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Thêm
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
