import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import "../koi/ManageKoi.css";

export default function ManageKoi() {
  const [kois, setKois] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      api.get("Kois/").then((data) => {
        if (data.success) {
          setKois(data.kois);
          console.log(data.kois);
        } else {
          console.log("Không có địa chỉ!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, []);

  async function deleteKoi(koiId) {
    try {
      api.del("Kois/" + koiId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newKois = kois.filter((koi) => koi.koiId !== koiId);
          setKois(newKois);
        } else {
          alert("Xóa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
  }
  return (
    <>
      <div>
        <Sidebar />
        <div className="content-container">
          <h1>Manage Koi</h1>
          <a href="/admin/add-koi" className="add-koi-btn">
            Add Koi
          </a>
          <table className="koi-table">
            <thead>
              <tr>
                <th>KoiId</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {kois.map((koi) => (
                <tr key={koi.koiId}>
                  <td>{koi.koiId}</td>
                  <td>{koi.koiName}</td>
                  <td>{koi.koiTypeName}</td>
                  <td>{koi.price}</td>
                  <td>{koi.weight}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteKoi(koi.koiId)}
                    >
                      Delete
                    </button>
                    <a
                      href={"/admin/edit-koi/" + koi.koiId}
                      className="update-btn"
                    >
                      Update
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
