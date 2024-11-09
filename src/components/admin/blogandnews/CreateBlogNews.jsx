import api from "../../../api/CallAPI";
import { Controller, useForm } from "react-hook-form";
import "../blogandnews/CreateBlogNews.css";
import MDEditor from "@uiw/react-md-editor";

export default function CreateBlogNews({ onClose, onAddSuccess }) {
  const { control, register, handleSubmit } = useForm();
  const userId = JSON.parse(localStorage.getItem("userId"));

  // Add blog/news
  const onSubmit = async (data) => {
    try {
      api.post("BlogNews", data).then((response) => {
        if (response.success) {
          alert("Thêm thành công!");
          onClose(); // Đóng modal
          onAddSuccess(); // Cập nhật danh sách
        } else {
          alert("Thêm thất bại!");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error! Please try again.");
    }
  };

  return (
    <div className="addblog-container">
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
          <input type="text" id="title" name="title" {...register("title")} />
        </div>
        <div className="form-group">
          <label htmlFor="title">Subtitle</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            {...register("subtitle")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            {...register("thumbnail")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => <MDEditor {...field} />}
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
  );
}
