import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import "../orderServiceDetail/AddOrderServiceDetail.css";

export default function AddOrderServiceDetail() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));

  //Them chi tiet dich vu don hang
  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("OrderServiceDetails/", data).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
          navigate("/admin/manage-order-service-detail");
        } else {
          alert("Thêm thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <>
      <a className="back-button" href="/admin/manage-order-service-detail">
        Back
      </a>
      <div className="add-orderservice-container">
        <h2 className="form-title">Add new order service details</h2>
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
    </>
  );
}
