import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import { useForm } from "react-hook-form"
import "../payment/AddPaymentMethod.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function AddPaymentType({ onClose, onAddSuccess }) {
    const { register, handleSubmit } = useForm()

    // Thêm Payment Type
    const onSubmit = async (data) => {
        try {
            const response = await api.post("payments/", data)
            if (response.success) {
                UserToast("success", "Payment method added successfully!")
                onAddSuccess() // Gọi callback để cập nhật danh sách trong ManagePaymentMethod
                onClose() // Đóng modal sau khi thêm mới thành công
            } else {
                UserToast("error", "Failed to add payment method!")
            }
        } catch (error) {
            console.error("Error during registration:", error)
            UserToast("error", "Error! Please try again.")
        }
    }

    return (
        <div className="addpayment-container">
            <ToastContainer />
            <h2 className="form-title">Add New Payment Method</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="addpayment-form">
                <div className="form-group">
                    <label htmlFor="paymentMethodName">
                        Payment Method Name
                    </label>
                    <input
                        type="text"
                        id="paymentMethodName"
                        name="paymentMethodName"
                        {...register("paymentMethodName")}
                        required
                    />
                </div>
                <button type="submit" className="btn-add">
                    ADD
                </button>
            </form>
        </div>
    )
}
