import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';

export default function AddDocument() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    let { orderId } = useParams();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            api.post("CustomsDocuments/", data)
                .then(data => {
                    if (data.success) {
                        alert('Thêm thành công!');
                    } else {
                        alert('Thêm thất bại!');
                    }
                });
        } catch (error) {
            console.error("Error :", error);
            alert("Error! Please try again.");
        }
    }

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h2 className="text-center">Thêm Tài liệu mới</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="orderId">Mã đơn hàng</label>
                  <input
                    type="number"
                    className="form-control"
                    id="orderId"
                    name="orderId"
                    value={orderId}
                    readOnly
                    {...register("orderId")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="filePath">Đường dẫn tệp</label>
                  <input
                    type="text"
                    className="form-control"
                    id="filePath"
                    name="filePath"
                    {...register("filePath")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Mô tả</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    {...register("description")}
                  />
                </div>
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