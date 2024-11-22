import { useForm } from "react-hook-form"
import api from "../../../api/CallAPI"
import { useEffect, useState } from "react"
import "../payment/EditPaymentMethod.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function EditPaymentType({ id, onClose, onUpdateSuccess }) {
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        const fetchPaymentMethod = async () => {
            try {
                const data = await api.get("payments/" + id)
                if (data.success) {
                    setValue(
                        "paymentMethodName",
                        data.paymentMethod.paymentMethodName
                    )
                } else {
                    console.log("No payment method found.")
                }
            } catch (error) {
                console.error("Error fetching PaymentMethod:", error)
                UserToast(
                    "error",
                    "An error occurred while fetching the PaymentMethod."
                )
            }
        }

        if (id) fetchPaymentMethod()
    }, [id, setValue])

    // Chỉnh sửa Payment Method
    const onSubmit = async (data) => {
        try {
            const response = await api.put("payments/" + id, data)
            if (response.success) {
                UserToast("success", "Update payment method successfully!")
                onUpdateSuccess() // Gọi callback để cập nhật bảng phương thức thanh toán
                onClose() // Đóng modal sau khi cập nhật thành công
            } else {
                UserToast("error", "Failed to update payment method!")
            }
        } catch (error) {
            console.error("Error during update:", error)
            UserToast(
                "error",
                "Failed to update payment method. Please try again."
            )
        }
    }

    return (
        <div className="updatepayment-container">
            <ToastContainer />
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
