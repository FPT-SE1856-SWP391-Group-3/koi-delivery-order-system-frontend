import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import ComponentPath from "routes/ComponentPath";
import Bootstrap from "../props/Bootstrap";
import UserSidebar from "../common/UserSidebar";

export default function UserAddress() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    try {
      api.get("Addresses/user/" + id).then((data) => {
        if (data.success) {
          setAddresses(data.address);
          console.log(data.address);
        } else {
          console.log("Không có địa chỉ!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [id]);

  async function deleteAddress(addressId) {
    try {
      api.del("Addresses/" + addressId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newAddresses = addresses.filter(
            (address) => address.addressId !== addressId
          );
          setAddresses(newAddresses);
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
    <div>
      <UserSidebar  />
      <Bootstrap />
      <div className="content">
      <h1>Address</h1>
      <a href={ComponentPath.user.address.createAddress} className="btn btn-primary" style={{width : "10em"}}>Add address</a>
      <table className="table table-hover" style={{marginTop : "1em"}}>
        <thead>
          <tr>
            <th>AddressId</th>
            <th>UserId</th>
            <th>Address Line</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <tr key={address.addressId}>
              <td>{address.addressId}</td>
              <td>{address.userId}</td>
              <td>{address.addressLine}</td>
              <td>
                <a href={ComponentPath.user.address.editAddress + address.addressId} className="btn btn-primary" style={{width : "30%", marginRight: "1em"}}>Update</a>
                <button onClick={() => deleteAddress(address.addressId)} className="btn btn-secondary" style={{width : "30%"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
