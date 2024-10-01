import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";
import { useEffect } from "react";
import { useState } from "react";

export default function EditPaymentType() {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        try {
            api.get("PaymentMethods/" + id)
                .then((data) => {
                    if (data.success) {
                        setValue("paymentMethodName", data.paymentMethod.paymentMethodName);
                        console.log(data.paymentMethod.paymentMethodName);
                    } else {
                        console.log("Không có phương thức thanh toán!");
                    }
                });
        } catch (error) {
            alert("An error has occurred. Please try again.");
        }
    }, [id, setValue]);

    // Chỉnh sửa phương thức thanh toán
    const onSubmit = async (data) => {
        console.log(data);
        try {
            api.put("PaymentMethods/" + id, data)
                .then((data) => {
                    if (data.success) {
                        alert("Chỉnh sửa thành công!");
                        navigate("/");
                    } else {
                        alert("Chỉnh sửa thất bại!");
                    }
                });
        } catch (error) {
            console.error("Error during update:", error);
            alert("An error occurred during update. Please try again.");
        }
    };

    return (
        <div>
            <Header />
            <div className="container"></div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Chỉnh sửa phương thức thanh toán</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="paymentMethodName">Tên phương thức thanh toán</label>
                            <input
                                type="text"
                                className="form-control"
                                id="paymentMethodName"
                                name="paymentMethodName"
                                {...register("paymentMethodName")}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Chỉnh sửa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
