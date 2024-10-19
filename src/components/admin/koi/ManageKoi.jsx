import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";

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
      <Sidebar />
      <div>
        <h1>Koi</h1>
        <a href="/admin/add-koi">Add Koi</a>
        <table>
          <thead>
            <tr>
              <th>KoiId</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Actions</th>
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
                  <button onClick={() => deleteKoi(koi.koiId)}>Delete</button>
                  <a href={"/admin/edit-koi/" + koi.koiId}>Update</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
