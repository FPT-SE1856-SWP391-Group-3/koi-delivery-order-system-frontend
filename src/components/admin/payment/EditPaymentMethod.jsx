import { useForm } from "react-hook-form"
import api from "../../../api/CallAPI"
import { useEffect, useState } from "react"
import "../payment/EditPaymentMethod.css"

export default function EditPaymentType({ id, onClose, onUpdateSuccess }) {
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        const fetchPaymentMethod = async () => {
            try {
                const data = await api.get("PaymentMethods/" + id)
                if (data.success) {
                    setValue(
                        "paymentMethodName",
                        data.paymentMethod.paymentMethodName
                    )
                } else {
                    console.log("Không có phương thức thanh toán!")
                }
            } catch (error) {
                alert("An error has occurred. Please try again.")
            }
        }

        if (id) fetchPaymentMethod()
    }, [id, setValue])

    // Chỉnh sửa Payment Method
    const onSubmit = async (data) => {
        try {
            const response = await api.put("PaymentMethods/" + id, data)
            if (response.success) {
                alert("Cập nhật thành công!")
                onUpdateSuccess() // Gọi callback để cập nhật bảng phương thức thanh toán
                onClose() // Đóng modal sau khi cập nhật thành công
            } else {
                alert("Cập nhật thất bại!")
            }
        } catch (error) {
            console.error("Error during update:", error)
            alert("An error occurred during update. Please try again.")
        }
    }

    return (
        <div className="updatepayment-container">
            <h1 className="form-title">Update Payment Method</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="updatepayment-form"
            >
                <div className="form-group">
                    <label htmlFor="paymentMethodName">
                        Payment Method Name
                    </label>
                    <input
                        type="text"
                        id="paymentMethodName"
                        {...register("paymentMethodName")}
                    />
                </div>
                <button type="submit" className="btn-update">
                    UPDATE
                </button>
            </form>
        </div>
    )
}
