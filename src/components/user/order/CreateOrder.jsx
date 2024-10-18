import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../common/Header";
import { set, useForm } from "react-hook-form";
import axios from "axios";

export default function CreateOrder() {
  const customerId = JSON.parse(localStorage.getItem("userId"));
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [address, setAddress] = useState([]);
  const [koiList, setKoiList] = useState([
    { koiId: "", amount: 0, koiCondition: "" , weight: 0, totalPrice: 0},
  ]);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [totalOrderWeight, setTotalOrderWeight] = useState(0);
  const [kois, setKois] = useState();
  const [orderServiceDetails, setOrderServiceDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [addresses, setAddresses] = useState([]);

  //Lay dia chi nguoi dung
  useEffect(() => {
    api.get("Addresses/user/" + customerId).then((data) => {
      if (data.success) {
        setAddress(data.address);
        var userAddress = (Array.isArray(data.address) ? data.address : []).filter(
          (address) => address.userId == customerId
        )[0];
        if (userAddress) {
          console.log(userAddress);
          setAddress(userAddress);
        } else {
          console.log("Address not found for userId:", customerId);
        }
        console.log(data.address);
      } else {
        console.log("Không có địa chỉ!");
      }
    });

    api.get("Kois/").then((data) => {
      if (data.success) {
        console.log(data.kois);
        setKois(data.kois);
      } else {
        console.log("Không có koi!");
      }
    });

    api.get("OrderServiceDetails/").then((data) => {
      if (data.success) {
        console.log(data.orderServiceDetails);
        setOrderServiceDetails(data.orderServiceDetails);
      } else {
        console.log("Không có dịch vụ!");
      }
    });

    axios
    .get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
    .then((response) => response.data)
    .then((data) => {
      setAddresses(data);
    });
  }, []);

  //Them koi
  const handleAddKoi = () => {
    setKoiList([...koiList, { koiId: "", amount: "", koiCondition: "", weight: 0, totalPrice: 0 }]);
  };

  //Cap nhat koi
  const handleKoiChange = (index, event) => {
    const { name, value } = event.target; // Lay gia tri cua input
    const updatedKoiList = [...koiList]; // Tao ra mot array moi
    updatedKoiList[index][name] = value; // Cap nhat gia tri cua input
    setKoiList(updatedKoiList); // Cap nhat lai koiList
    calculateTotalPrice(updatedKoiList);
  };

  const handleDeleteKoi = (index) =>{
    koiList.splice(index, 1);
    setKoiList([...koiList]);
    calculateTotalPrice(koiList);
  }

  const calculateTotalPrice = (koiList) => {
    let totalOrderPrice = 0;
    let totalWeight = 0; 
    let totalPrice = 0;
    koiList.forEach((koi) => {
      const koiData = kois.find((k) => k.koiId === parseInt(koi.koiId));
      if (koiData) {
        const koiPrice = koiData.price || 0;
        const koiWeight = koiData.weight || 0;
        totalOrderPrice += koi.amount * koiPrice; // Tính tổng giá
        totalWeight += koi.amount * koiWeight; // Tính tổng khối lượng
      }
    });
    setTotalOrderPrice(totalOrderPrice);
    setTotalOrderWeight(totalWeight);
    console.log(totalOrderPrice);
    if (totalOrderPrice > 0){
    orderServiceDetails.forEach((orderServiceDetail) => {
      totalPrice += orderServiceDetail.orderServiceDetailPrice;
    });
      setTotalPrice(totalPrice + totalOrderPrice);
  } else {
    setTotalPrice(0);
  }

  };
  const [fullAddress, setFullAddress] = useState();
  const [partAddress, setPartAddress] = useState();

  const handleChange = (e) => {
      console.log(e.target.value);
      if (e.target.value != "") {
        setFullAddress(e.target.value + ", " + wardName + ", " + districtName + ", " + cityName);
        setPartAddress(wardName + ", " + districtName + ", " + cityName);
      } 
}

  //Tao don hang
  const onSubmit = async (data) => {
    console.log(data);
    const koiIds = koiList.map((koi) => koi.koiId);
    const amounts = koiList.map((koi) => koi.amount);
    const koiConditions = koiList.map((koi) => koi.koiCondition);

    const fullOrderData = {
      ...data, // Lấy các dữ liệu từ form người nhận
      koiId: koiIds,
      amount: amounts,
      koiCondition: koiConditions,
      totalPrice: totalPrice,
      receiverPartAddressLine : partAddress,
      receiverFullAddressLine : fullAddress
    };
    console.log(fullOrderData);
    try {
      api.post("Orders/", fullOrderData).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
          navigate("/add-document/" + data.orderId + "/" + customerId); 
        } else {
          alert("Thêm thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  //  const importFile= async (e) => {
  //    console.log(file); //check all files
  //    for (const uploadedFile of file) {
  //      if (uploadedFile) {
  //        const formData = new FormData(); //make a bew FormData for every file.
  //        formData.append("file", uploadedFile, uploadedFile.name); //append the file to the formdata
  //        try {
  //          api.postFile("CustomsDocuments/test", formData).then((data) => {
  //            if (data.success) {
  //              alert("Upload thành công!");
  //            } else {
  //              alert("Upload thất bại!");
  //            }
  //          });
  //        } catch (ex) {
  //          console.log(ex);
  //        }
  //      }
  //    }
  //  }


  console.log(fullAddress);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Nguoi gui </h1>
        <h3>Ten: {user.userName}</h3>
        <h3>SDT: {user.phoneNumber}</h3>
        <h3>Email: {user.email}</h3>
        <h1>Nguoi nhan</h1>
        <input
          type="hidden"
          id="customerId"
          name="customerId"
          value={customerId}
          {...register("customerId")}
        />
        <input
          type="hidden"
          id="startAddress"
          name="startAddress"
          value={"Bãi cỏ KTX khu B, Phường Đông Hòa, Dĩ An, Tỉnh Bình Dương, Việt Nam"}
          {...register("startAddress")}
        />
        <input
          type="text"
          id="receiverName"
          name="receiverName"
          placeholder="Ten nguoi nhan"
          {...register("receiverName")}
        />
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="So dien thoai nguoi nhan"
          {...register("receiverPhoneNumber")}
        />
        <input
          type="text"
          id="receiverEmail"
          name="receiverEmail"
          placeholder="Email nguoi nhan"
          {...register("receiverEmail")}
        />
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
        <input
          type="text"
          id="receiverAddressLine"
          name="receiverAddressLine"
          placeholder="Dia chi nguoi nhan"
          value={fullAddress}
        />

        <h1>Thong tin loai hang</h1>
        {koiList.map((koi, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <input
              type="number"
              name="koiId"
              placeholder="ID Koi"
              value={koi.koiId}
              onChange={(event) => handleKoiChange(index, event)}
            />{" "}
            Koi Id
            <br />
            <p>
              Ten koi:{" "}
              {kois?.find((k) => k.koiId === parseInt(koi.koiId))?.koiName ||
                ""}
            </p>
            <input
              type="number"
              name="amount"
              placeholder="So luong"
              value={koi.amount}
              onChange={(event) => handleKoiChange(index, event)}
            />{" "}
            So luong
            <br />
            <p>
              Khoi luong:{" "}
              {koi.amount *
                (kois?.find((k) => k.koiId === parseInt(koi.koiId))?.weight ||
                  0)}{" "}
              g
            </p>
            <p>
              Gia mot con:{" "}
              {kois?.find((k) => k.koiId === parseInt(koi.koiId))?.price || 0}{" "}
              VND
            </p>
            <p>
              Tong gia:
              {koi.amount *
                (kois?.find((k) => k.koiId === parseInt(koi.koiId))?.price ||
                  0)}{" "}
              D
            </p>
            <input
              type="text"
              name="koiCondition"
              placeholder="Tinh trang"
              value={koi.koiCondition}
              onChange={(event) => handleKoiChange(index, event)}
            />{" "}
            Tinh Trang
            <button type="button" onClick={() => handleDeleteKoi(index)}>Xoa</button>
          </div>
        ))}
        <button type="button" onClick={handleAddKoi}>
          + Thêm hàng hóa
        </button>
        {/*
          HandleAddKoi hoat dong bang cach tao ra mot array moi voi phan tu cu va them mot phan tu moi vao cuoi array
          Khi do koiList.map se chay lai va tao ra cac input moi
        */}

        <h2>Tong gia: {totalOrderPrice} VND</h2>
        <h2>Tong khoi luong: {totalOrderWeight} g</h2>
        {orderServiceDetails.map((orderServiceDetail) => (
          <>
            <h1>Cac dich vu</h1>
            <p>Gia dich vu: {orderServiceDetail.orderServiceDetailName} </p>
            <p>Gia cuoc: {orderServiceDetail.orderServiceDetailPrice} </p>
          </>
        ))}

        <h1>Tong tien: {totalPrice}</h1>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
