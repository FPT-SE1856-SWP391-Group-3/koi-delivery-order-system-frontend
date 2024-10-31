import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../../css/CreateOrder.css";
import { Grid } from "@mui/joy";

const ReceiverInfo = ({ onChange }) => {
  const [addresses, setAddresses] = useState([]);
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [receiverFullAddressLine, setReceiverFullAddressLine] = useState("");
  const [receiverPartAddressLine, setReceiverPartAddressLine] = useState("");


  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchAddressData();
  }, []);

  const filteredDistricts = addresses.find((address) => address.Name === cityName)?.Districts || [];
  const filteredWards = filteredDistricts.find((district) => district.Name === districtName)?.Wards || [];

  const updateReceiverInfo = () => {
    onChange({
      cityName,
      districtName,
      wardName,
      phoneNumber,
      fullName,
      email,
      receiverFullAddressLine,
      receiverPartAddressLine,
    });
  };

  const updateReceiverFullAddress = (e) => {
    if (!!wardName && !!districtName && !!cityName) {
      setReceiverFullAddressLine(`${e.target.value}, ${wardName}, ${districtName}, ${cityName}`);
      setReceiverPartAddressLine(`${wardName}, ${districtName}, ${cityName}`)
    }
  };

  useEffect(updateReceiverInfo, [cityName, districtName, wardName, phoneNumber, fullName, receiverFullAddressLine, receiverPartAddressLine]);


  return (
    <div>
      <h2>Receiver Information</h2>
      <div className="sectionCompo">
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="city">City/Province</label>
        <select
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
            setDistrictName("");
            setWardName("");
          }}
        >
          <option value="">Choose City</option>
          {addresses.map((address) => (
            <option key={address.Id} value={address.Name}>
              {address.Name}
            </option>
          ))}
        </select>

        <label htmlFor="district">District</label>
        <select
          value={districtName}
          onChange={(e) => {
            setDistrictName(e.target.value);
            setWardName("");
          }}
          disabled={!cityName}
        >
          <option value="">Choose District</option>
          {filteredDistricts.map((district) => (
            <option key={district.Id} value={district.Name}>
              {district.Name}
            </option>
          ))}
        </select>

        <label htmlFor="ward">Ward/Commune</label>
        <select
          value={wardName}
          onChange={(e) => setWardName(e.target.value)}
          disabled={!districtName}
        >
          <option value="">Choose Ward</option>
          {filteredWards.map((ward) => (
            <option key={ward.Id} value={ward.Name}>
              {ward.Name}
            </option>
          ))}
        </select>
        <label>Specific Address</label>
        <input
          type="text"
          placeholder="Enter specific address"
          onChange={(e) => updateReceiverFullAddress(e)}
        />
        <label>Full Address</label>
        <input type="text" value={receiverFullAddressLine} readOnly />
      </div>
    </div>
  );
};

// Xác nhận prop types
ReceiverInfo.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ReceiverInfo;