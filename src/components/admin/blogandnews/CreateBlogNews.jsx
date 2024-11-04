import api from "../../../api/CallAPI"
import { useForm } from "react-hook-form"
import "../blogandnews/CreateBlogNews.css"

export default function CreateBlogNews({ onClose, onAddSuccess }) {
    const { register, handleSubmit } = useForm()
    const userId = JSON.parse(localStorage.getItem("userId"))

    // Add blog/news
    const onSubmit = async (data) => {
        try {
            api.post("BlogNews", data).then((response) => {
                if (response.success) {
                    alert("Thêm thành công!")
                    onClose() // Đóng modal
                    onAddSuccess() // Cập nhật danh sách
                } else {
                    alert("Thêm thất bại!")
                }
            })
        } catch (error) {
            console.error("Error:", error)
            alert("Error! Please try again.")
        }
    }

    return (
        <div className="addblog-container">
            <h1 className="form-title">Add Blog/News</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="addblog-form">
                <input
                    type="hidden"
                    id="userId"
                    name="userId"
                    value={userId}
                    {...register("userId")}
                />
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        {...register("title")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        {...register("content")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        {...register("category")}
                    />
                </div>
                <button type="submit" className="btn-add">
                    ADD
                </button>
            </form>
        </div>
    )
}
