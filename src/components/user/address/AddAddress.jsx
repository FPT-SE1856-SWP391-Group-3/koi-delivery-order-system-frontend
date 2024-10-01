import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../common/Header";

export default function AddAddress() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));

  //Them dia chi
  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("Addresses/", data).then((data) => {
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
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Thêm địa chỉ mới</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="hidden"
                  id="userId"
                  name="userId"
                  value={userId}
                  {...register("userId")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressLine">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine"
                  name="addressLine"
                  {...register("addressLine")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">Thành phố</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  {...register("city")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Mã bưu chính</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  name="postalCode"
                  {...register("postalCode")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Quoc gia</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  {...register("country")}
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
