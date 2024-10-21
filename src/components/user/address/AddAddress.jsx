import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AddAddress() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [addressLine, setAddressLine] = useState();
  const [addresses, setAddresses] = useState([]);

  //Them dia chi
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await api.post("Addresses/", data).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
          navigate("/");
        } else {
          alert("Thêm thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
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
        setAddressLine(
          e.target.value +
            ", " +
            wardName +
            ", " +
            districtName +
            ", " +
            cityName
        );
      } else {
        setAddressLine("");
      }
    }
  };

  console.log(addresses);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Thêm địa chỉ mới</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="hidden"
                  id="userId"
                  name="userId"
                  value={userId}
                  {...register("userId")}
                />
              </div>
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
                    handleChange(e);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressLine">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine"
                  name="addressLine"
                  readOnly
                  value={addressLine}
                  onChange={(e) => setValue("addressLine", addressLine)}
                  {...register("addressLine")}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
