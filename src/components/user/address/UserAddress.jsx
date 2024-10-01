import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';

export default function UserAddress() {
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    const id = localStorage.getItem('userId');

    useEffect(() => {
        try {
            api.get('Addresses/user/' + id)
                .then(data => {
                    if (data.success) {
                        setAddresses(data.address);
                        console.log(data.address);
                    } else {
                        console.log('Không có địa chỉ!');
                    }
                });
        } catch (error) {
            alert("An error has occurred. Please try again.");
        }
    }, [id]);

    async function deleteAddress(addressId) {
        try {
            api.del('Addresses/' + addressId).then(data => {
            if (data.success) {
                alert('Xóa thành công!');
                const newAddresses = addresses.filter(address => address.addressId !== addressId);
                setAddresses(newAddresses);
            } else {
                alert('Xóa thất bại!');
            }
        });
        } catch (error) {
            console.error("Error during deletion:", error);
            alert("An error occurred during deletion. Please try again.");
        }
    }

    return (
        <div>
            <Header />
            <h1>Address</h1>
            <a href="/add-address">Add address</a>
            {addresses.map((address) => (
                <div key={address.addressId}>
                    <h3>AddressId: {address.addressId}</h3>
                    <h3>UserId: {address.userId}</h3>
                    <h3>Address: {address.address}</h3>
                    <h3>City: {address.city}</h3>
                    <h3>Country: {address.country}</h3>
                    <h3>ZipCode: {address.zipCode}</h3>
                    <h3>
                        <a href={"/edit-address/" + address.addressId}>Update</a>
                    </h3>
                    <h3>
                        <button onClick={() => deleteAddress(address.addressId)}>Delete</button>
                    </h3>
                </div>
            ))}
        </div>
    );
}