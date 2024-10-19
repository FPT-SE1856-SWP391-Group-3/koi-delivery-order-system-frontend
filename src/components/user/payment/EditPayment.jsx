import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditPayment() {
  const [payment, setPayment] = useState();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));
  let { id } = useParams();

  //Set gia tri cho payment

  //Goi API de lay thong tin payment
  useEffect(() => {
    try {
      api.get("Payments/" + userId).then((data) => {
        if (data.success) {
          setPayment(data.payment[0]);
          console.log(data.payment[0]);
        } else {
          alert("Không có thanh toán!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [id]);

  //Them dia chi
  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); //Ngan form tu chuyen tiep
      api.put("Payments/" + id, payment).then((data) => {
        if (data.success) {
          alert("Sửa thành công!");
          navigate("/user-payment");
        } else {
          alert("Sửa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error!:", error);
      alert("Error!. Please try again.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Sửa Thanh toán mới</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="hidden"
                  id="userId"
                  name="userId"
                  value={userId}
                  onChange={(e) =>
                    setPayment({ ...payment, userId: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentMethodId">Kiểu thanh toán</label>
                <input
                  type="text"
                  className="form-control"
                  id="paymentMethodId"
                  name="paymentMethodId"
                  value={payment?.paymentMethodId}
                  onChange={(e) =>
                    setPayment({ ...payment, paymentMethodId: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentNumber">Sô tài khoản</label>
                <input
                  type="text"
                  className="form-control"
                  id="paymentNumber"
                  name="paymentNumber"
                  value={payment?.paymentNumber}
                  onChange={(e) =>
                    setPayment({ ...payment, paymentNumber: e.target.value })
                  }
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
