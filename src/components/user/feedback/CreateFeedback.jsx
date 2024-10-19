import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";

export default function CreateFeedback() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));
  let { orderId } = useParams();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("CustomerFeedbacks/", data).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
        } else {
          alert("Thêm thất bại!");
        }
      });
    } catch (error) {
      console.error("Error!", error);
      alert("Error!. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Thêm Phản hồi mới</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="hidden"
                  id="userId"
                  name="userId"
                  value={userId}
                  {...register("customerId")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="orderId">Mã đơn hàng</label>
                <input
                  type="number"
                  className="form-control"
                  id="orderId"
                  name="orderId"
                  value={orderId}
                  readOnly
                  {...register("orderId")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Bình luận</label>
                <textarea
                  className="form-control"
                  id="comment"
                  name="comment"
                  {...register("comment")}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
