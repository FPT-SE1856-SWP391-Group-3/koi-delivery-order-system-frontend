import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';


export default function AddPayment () {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    let userId = JSON.parse(localStorage.getItem('userId'));


    //Them dia chi
    const onSubmit = async (data) => {
        try {
              
          api.post("Payments/", data)
                .then(data => {
                    if (data.success) {
                        alert('Thêm thành công!');
                        navigate('/user-payment');
                    } else {
                        alert('Thêm thất bại!');
                    }
                });
        } catch (error) {
            console.error("Error:", error);
            alert("Error! Please try again.");
        }
    }

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h2 className="text-center">Thêm Thanh toán mới</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    type="hidden"
                    id="userId"
                    name="userId"
                    value={userId}
                    {...register("userId")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="paymentMethod">Kiểu thanh toán</label>
                  <input
                    type="text"
                    className="form-control"
                    id="paymentMethod"
                    name="paymentMethod"
                    {...register("paymentMethodId")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="paymentNumber">Sô tài khoản</label>
                  <input
                    type="text"
                    className="form-control"
                    id="paymentNumber"
                    name="paymentNumber"
                    {...register("paymentNumber")}
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