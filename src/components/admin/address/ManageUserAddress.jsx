import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../user/common/Header";

export default function ManageUserAddress() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      api.get("Addresses/user/" + id)
        .then((data) => {
          if (data.success) {
            setAddresses(data.address);
            console.log(data.address);
          } else {
            alert("Không có địa chỉ!");
          }
        });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [id]);


  return (
    <div>
      <Header />
      <h1>Address</h1>
      {/* <a href={"/admin/addAddress/" + id}>Add address</a> */}
      {addresses.map((address) => (
        <div key={address.addressId}>
          <h3>AddressId: {address.addressId}</h3>
          <h3>UserId: {address.userId}</h3>
          <h3>Address: {address.address}</h3>
          <h3>City: {address.city}</h3>
          <h3>Country: {address.country}</h3>
          <h3>postalCode: {address.postalCode}</h3>
        </div>
      ))}
    </div>
  );
}
