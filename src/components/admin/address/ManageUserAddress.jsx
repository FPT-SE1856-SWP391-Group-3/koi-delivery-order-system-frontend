import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import "../address/ManageUserAddress.css";

export default function ManageUserAddress() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      api.get("Addresses/user/" + id).then((data) => {
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
    <>
      <a className="back-button" href="/admin/manage-user">
        Back
      </a>
      <div className="address-container">
        <h1 className="address-title">Address List</h1>
        <div className="address-list">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div className="address-card" key={address.addressId}>
                <p>
                  <strong>AddressId:</strong> {address.addressId}
                </p>
                <p>
                  <strong>UserId:</strong> {address.userId}
                </p>
                <p>
                  <strong>Address:</strong> {address.address}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>Country:</strong> {address.country}
                </p>
                <p>
                  <strong>Postal Code:</strong> {address.postalCode}
                </p>
              </div>
            ))
          ) : (
            <p>No addresses found.</p>
          )}
        </div>
      </div>
    </>
  );
}
