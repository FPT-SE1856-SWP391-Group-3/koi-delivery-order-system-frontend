import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "../koi/EditKoi.css";

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
    <>
      <a className="back-button" href="/admin/manage-koi">
        Back
      </a>
      <div className="updatekoi-container">
        <h1 className="form-title">Update Koi</h1>
        <form onSubmit={handleSubmit} className="updatekoi-form">
          <div className="form-group">
            <label htmlFor="name">Koi Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Nhập tên koi..."
              value={updateKoi.koiName}
              onChange={(e) =>
                setUpdateKoi({ ...updateKoi, koiName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="id">Koi Type</label>
            <input
              type="number"
              className="form-control"
              id="id"
              name="id"
              placeholder="Nhập ID loại koi..."
              value={updateKoi.koiTypeId}
              onChange={(e) =>
                setUpdateKoi({ ...updateKoi, koiTypeId: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              placeholder="Nhập giá koi..."
              value={updateKoi.price}
              onChange={(e) =>
                setUpdateKoi({ ...updateKoi, price: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              placeholder="Nhập trọng lượng koi..."
              value={updateKoi.weight}
              onChange={(e) =>
                setUpdateKoi({ ...updateKoi, weight: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn-update">
            UPDATE
          </button>
        </form>
      </div>
    </>
  );
}
