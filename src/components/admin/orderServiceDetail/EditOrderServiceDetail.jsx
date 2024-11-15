import { useForm } from "react-hook-form"
import api from "../../../api/CallAPI"
import { useEffect } from "react"
import "../orderServiceDetail/EditOrderServiceDetail.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function EditOrderServiceDetail({
    id,
    onClose,
    onUpdateSuccess,
}) {
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        // Gọi API để lấy dữ liệu ban đầu của dịch vụ
        const fetchServiceDetail = async () => {
            try {
                const data = await api.get("OrderServiceDetails/" + id)
                if (data.success) {
                    setValue(
                        "orderServiceDetailName",
                        data.orderServiceDetail.orderServiceDetailName
                    )
                    setValue(
                        "orderServiceDetailPrice",
                        data.orderServiceDetail.orderServiceDetailPrice
                    )
                } else {
                    console.log("No order service detail found.")
                }
            } catch (error) {
             UserToast(
                 "error",
                 "An error occurred while fetching the order service detail."
             )
            }
        }

        if (id) fetchServiceDetail()
    }, [id, setValue])

    // Xử lý cập nhật dịch vụ
    const onSubmit = async (data) => {
        try {
            const response = await api.put("OrderServiceDetails/" + id, data)
            if (response.success) {
              UserToast("success", "Update order service detail successfully!")
                onUpdateSuccess() // Gọi callback để cập nhật danh sách trong ManageOrderServiceDetail
                onClose() // Đóng modal
            } else {
               UserToast("error", "Failed to update order service detail!")
            }
        } catch (error) {
            console.error("Error during update:", error)
            UserToast(
                "error",
                "An error occurred during update. Please try again."
            )
        }
    }

    return (
        <div className="update-orderservice-container">
            <ToastContainer />
            <h1 className="form-title">Update Order Service Details</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="update-orderservice-form"
            >
                <div className="form-group">
                    <label htmlFor="orderServiceDetailName">Service Name</label>
                    <input
                        type="text"
                        id="orderServiceDetailName"
                        {...register("orderServiceDetailName")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="orderServiceDetailPrice">Price</label>
                    <input
                        type="text"
                        id="orderServiceDetailPrice"
                        {...register("orderServiceDetailPrice")}
                    />
                </div>
                <button type="submit" className="btn-update">
                    UPDATE
                </button>
            </form>
        </div>
    )
}
