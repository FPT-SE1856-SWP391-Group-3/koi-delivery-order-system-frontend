import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../../../api/CallAPI";
import Header from "../common/Header";

export default function EditAddress() {
  const [updateAddress, setUpdateAddress] = useState([
    { addressLine: "" },
  ]);
  const [currentAddress, setCurrentAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const { addressId } = useParams(); // Lấy addressId từ URL params
  const navigate = useNavigate();
  console.log(addressId);

  useEffect(() => {
    // Gọi API để lấy thông tin địa chỉ dựa trên addressId
    const fetchAddress = async () => {
      try {
        api.get("Addresses/" + addressId).then((data) => {
          if (data.success) {
            console.log(data.address);
            setCurrentAddress(data.address.addressLine); // Set giá trị vào state
          } else {
            alert("Không tìm thấy địa chỉ!");
          }
        });
      } catch (error) {
        console.error("Error fetching address:", error);
        alert("An error occurred while fetching the address.");
      }
    };

    fetchAddress();
  }, [addressId]);
  //Them dia chi
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    try {
     await api.put("Addresses/" + addressId,  updateAddress).then((data) => {
        if (data.success) {
          alert("Cập nhật thành công!");
          navigate("/user-address");
        } else {
          alert("Cập nhật thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during update. Please try again.");
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => response.data)
      .then((data) => {
        setAddresses(data);
      });
  }, []);

  const handleChange = (e) => {
    if (cityName && districtName && wardName) {
      console.log(e.target.value);
      if (e.target.value != "") {
        setUpdateAddress({
          addressLine : e.target.value + ", " + wardName + ", " + districtName + ", " + cityName
        });
      } else {
        setUpdateAddress({
          addressLine : ""
        });
      }
    }
}


  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Cập nhật địa chỉ</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="city">Thành phố</label>
                <select
                  onChange={(e) => {
                    setCityName(e.target.value);
                  }}
                >
                  <option value="">Chọn thành phố</option>
                  {addresses.map((address) => (
                    <option key={address.Id} value={address.Name}>
                      {address.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="district">Huyện</label>
                <select
                  onChange={(e) => {
                    setDistrictName(e.target.value);
                  }}
                >
                  <option value="">Chọn huyện</option>
                  {addresses.map((address) => {
                    if (address.Name == cityName) {
                      return address.Districts.map((district) => (
                        <option key={district.Id} value={district.Name}>
                          {district.Name}
                        </option>
                      ));
                    }
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ward">Quận/Xã</label>
                <select
                  onChange={(e) => {
                    setWardName(e.target.value);
                  }}
                >
                  <option value="">Chọn quận/xã</option>
                  {addresses.map((address) => {
                    if (address.Name == cityName) {
                      return address.Districts.map((district) => {
                        if (district.Name == districtName) {
                          return district.Wards.map((ward) => (
                            <option key={ward.Id} value={ward.Name}>
                              {ward.Name}
                            </option>
                          ));
                        }
                      });
                    }
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="specificAddress">Địa chỉ cụ thể</label>
                <input
                  type="text"
                  className="form-control"
                  id="specificAddress"
                  name="specificAddress"
                  onChange={(e) => {
                      handleChange(e) 
                    }
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressLine">Địa chỉ hiện tại {currentAddress}  </label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine"
                  name="addressLine"
                  value={updateAddress.addressLine}  
                  readOnly
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
