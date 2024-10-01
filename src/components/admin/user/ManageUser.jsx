import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Sidebar from "../../user/common/Sidebar";
import Header from "../../user/common/Header";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      api.get("Users").then((data) => {
        if (data.success) {
          setUsers(data.users);
          console.log(data.users);
        } else {
          alert("Lấy danh sách người dùng thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  }, []);

  //Xoa nguoi dung
  const deleteUser = async (userId) => {
    try {
      api.del("Users/" + userId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newUsers = users.filter((user) => user.userId !== userId);
          setUsers(newUsers);
        } else {
          alert("Xóa thất bại!");
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
      <Sidebar />
      <div className="content">
        <h1>Manage User</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>UserId</th>
              <th>PhoneNumber</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userName}</td>
                <td>{user.userId}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.roleName}</td>
                <td>
                  <button onClick={() => deleteUser(user.userId)}>
                    Delete
                  </button>
                  <a
                    href={"/admin/update-user/" + user.userId}
                    className="btn btn-primary"
                  >
                    Update
                  </a>
                  <a
                    href={"/admin/user-address/" + user.userId}
                    className="btn btn-primary"
                  >
                    Address
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
