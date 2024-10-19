import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";

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
          navigate("/");
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
    <div>
      <div className="container"></div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Thêm chi tiết dịch vụ đơn hàng mới</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="OrderServiceDetailName">Tên dịch vụ</label>
              <input
                type="text"
                className="form-control"
                id="OrderServiceDetailName"
                name="OrderServiceDetailName"
                {...register("OrderServiceDetailName")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="OrderServiceDetailPrice">Giá</label>
              <input
                type="text"
                className="form-control"
                id="OrderServiceDetailPrice"
                name="OrderServiceDetailPrice"
                {...register("OrderServiceDetailPrice")}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
