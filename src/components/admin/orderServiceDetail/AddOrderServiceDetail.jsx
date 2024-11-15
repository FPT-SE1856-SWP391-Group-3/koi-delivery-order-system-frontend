import { useForm } from "react-hook-form"
import api from "../../../api/CallAPI"
import "../orderServiceDetail/AddOrderServiceDetail.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function AddOrderServiceDetail({ onClose, onAddSuccess }) {
    const { register, handleSubmit } = useForm()

    // Thêm chi tiết dịch vụ đơn hàng
    const onSubmit = async (data) => {
        try {
            const response = await api.post("OrderServiceDetails/", data)
            if (response.success) {
                UserToast("success", "Order service detail added successfully!")
                onAddSuccess() // Gọi callback để cập nhật bảng trong ManageOrderServiceDetail
                onClose() // Đóng modal sau khi thêm thành công
            } else {
                UserToast("error", "Failed to add order service detail!")
            }
        } catch (error) {
            console.error("Error during registration:", error)
            UserToast("error", "Error! Please try again.")
        }
    }

    return (
        <div className="add-orderservice-container">
            <ToastContainer />
            <h1 className="form-title">Add new order service details</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="add-orderservice-form"
            >
                <div className="form-group">
                    <label htmlFor="OrderServiceDetailName">Service Name</label>
                    <input
                        type="text"
                        id="OrderServiceDetailName"
                        name="OrderServiceDetailName"
                        {...register("OrderServiceDetailName")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="OrderServiceDetailPrice">Price</label>
                    <input
                        type="text"
                        id="OrderServiceDetailPrice"
                        name="OrderServiceDetailPrice"
                        {...register("OrderServiceDetailPrice")}
                    />
                </div>
                <button type="submit" className="btn-add">
                    ADD
                </button>
            </form>
        </div>
    )
}
