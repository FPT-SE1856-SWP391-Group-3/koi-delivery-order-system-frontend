import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditKoi() {
  const [updateKoi, setUpdateKoi] = useState({
    name: "",
    age: "",
    type: "",
    description: "",
  });
  const { koiId } = useParams(); // Lấy koiId từ URL params
  const navigate = useNavigate();
  console.log(koiId);
  console.log(updateKoi);

  useEffect(() => {
    // Gọi API để lấy thông tin koi dựa trên koiId
    const fetchKoi = async () => {
      try {
        api.get("Kois/" + koiId).then((data) => {
          if (data.success) {
            console.log(data.koi);
            setUpdateKoi(data.koi); // Set giá trị vào state
          } else {
            alert("Không tìm thấy koi!");
          }
        });
      } catch (error) {
        console.error("Error fetching koi:", error);
        alert("An error occurred while fetching the koi.");
      }
    };

    fetchKoi();
  }, [koiId]);

  // Cập nhật koi
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
      api.put("Kois/" + koiId, updateKoi).then((data) => {
        if (data.success) {
          alert("Cập nhật thành công!");
          navigate("/admin/manage-koi");
        } else {
          alert("Cập nhật thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Cập nhật Koi</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={updateKoi.koiName}
                  onChange={(e) =>
                    setUpdateKoi({ ...updateKoi, koiName: e.target.value })
                  } // Xử lý sự kiện thay đổi
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">Loại</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  name="id"
                  value={updateKoi.koiTypeId}
                  onChange={(e) =>
                    setUpdateKoi({ ...updateKoi, koiTypeId: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  value={updateKoi.price}
                  onChange={(e) =>
                    setUpdateKoi({ ...updateKoi, price: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Trọng lượng</label>
                <textarea
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={updateKoi.weight}
                  onChange={(e) =>
                    setUpdateKoi({ ...updateKoi, weight: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
