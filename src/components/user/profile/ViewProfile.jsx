import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';

export default function ViewProfile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    //Xoa nguoi dung
    const deleteUser = async (e) => {
        e.preventDefault();
        try {
                api.del('Users')
                .then(data => {
                    if (data.success) {
                        alert('Xóa thành công!');
                        localStorage.removeItem('user');
                        navigate('/');
                    } else {
                        alert('Xóa thất bại!');
                    }
                });
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
    }


    return (
        <div>
            <Header/>
            <h1>View Profile</h1>
            <h3>Username: {user.userName}</h3>
            <h3>UserId: {user.userId}</h3>
            <h3>PhoneNumber: {user.phoneNumber}</h3>
            <h3>Role: {user.roleName}</h3>
            <h3><a href="/edit-profile">Update</a></h3>
            <h3><button onClick={deleteUser}>Delete</button></h3>
            <a href="/user-address">View Address</a>
            <h3>-------------------------------------------</h3>
            <h1>View Payment</h1>
            <a href="/user-payment">View Payment</a>

        </div>
    );
}