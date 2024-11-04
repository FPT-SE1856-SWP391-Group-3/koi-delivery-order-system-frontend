import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import { useForm } from "react-hook-form"
import "../payment/AddPaymentMethod.css"

export default function AddPaymentType({ onClose, onAddSuccess }) {
    const { register, handleSubmit } = useForm()

    // Thêm Payment Type
    const onSubmit = async (data) => {
        try {
            const response = await api.post("PaymentMethods/", data)
            if (response.success) {
                alert("Thêm thành công!")
                onAddSuccess() // Gọi callback để cập nhật danh sách trong ManagePaymentMethod
                onClose() // Đóng modal sau khi thêm mới thành công
            } else {
                alert("Thêm thất bại!")
            }
        } catch (error) {
            console.error("Error during registration:", error)
            alert("An error occurred during registration. Please try again.")
        }
    }

    return (
        <div className="addpayment-container">
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
