import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';

export default function EditAddress() {
    const [ updateAddress, setUpdateAddress ] = useState({ addressLine: '', city: '', postalCode: '', country: '' });
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
                    setUpdateAddress(data.address); // Set giá trị vào state
                } else {
                    alert('Không tìm thấy địa chỉ!');
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
            api.put("Addresses/" + addressId, updateAddress).then((data) => {
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




   return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h2 className="text-center">Cập nhật địa chỉ</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="addressLine">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressLine"
                    name="addressLine"
                    value={updateAddress.addressLine}
                    onChange={(e) => setUpdateAddress({...updateAddress, addressLine: e.target.value})} // Xử lý sự kiện thay đổi
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">Thành phố</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={updateAddress.city}
                    onChange={(e) => setUpdateAddress({...updateAddress, city: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Mã bưu chính</label>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    name="postalCode"
                    value={updateAddress.postalCode}
                    onChange={(e) => setUpdateAddress({...updateAddress, postalCode: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Quốc gia</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={updateAddress.country}
                    onChange={(e) => setUpdateAddress({...updateAddress, country: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}