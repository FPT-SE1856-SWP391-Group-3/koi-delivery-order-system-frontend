import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';
import ComponentPath from '@componentPath';


export default function ViewProfile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  //Xoa nguoi dung
  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      api.del("Users").then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          localStorage.removeItem("user");
          navigate("/");
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
      <h1>View Profile</h1>
      <table>
        <tbody>
          <tr>
            <td>Username:</td>
            <td>{user.userName}</td>
          </tr>
          <tr>
            <td>UserId:</td>
            <td>{user.userId}</td>
          </tr>
          <tr>
            <td>PhoneNumber:</td>
            <td>{user.phoneNumber}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{user.roleName}</td>
          </tr>
          <tr>
            <td>Update:</td>
            <td>
               <td><a href={ComponentPath.user.profile.editProfile}>Update</a></td>
            </td>
          </tr>
          <tr>
            <td>Delete:</td>
            <td>
             <td><button onClick={deleteUser}>Delete</button></td>
            </td>
          </tr>
          <tr>
            <td>View Address:</td>
            <td>
            <td><a href={ComponentPath.user.address.viewAddress}>View Address</a></td>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>-------------------------------------------</h3>
      <h1>View Payment</h1>
       <a href={ComponentPath.user.payment.viewPayment}>View Payment</a>
      <h1>Update Password</h1>
      <a href={ComponentPath.user.profile.updatePassword}>Update Password</a>  
    </div>
  );
}

