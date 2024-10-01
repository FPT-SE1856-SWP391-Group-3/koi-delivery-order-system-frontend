import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';


export default function EditProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [updateUser, setUpdateUser] = useState({
      email: user.email,
      userName: user.userName,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {   
                // Goi api update user
                api.put('Users/' + user.userId, updateUser)
                .then(data => {
                    if (data.success) {
                        alert('Cập nhật thành công!');
                        localStorage.setItem('user', JSON.stringify(data.user));
                        navigate('/');
                    } else {
                        alert('Cập nhật thất bại!');
                    }
                });
        } catch (error) {
            console.error("Error:", error);
            alert("Error! Please try again.");
        }
    }


    return (
        <div>
            <Header/>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={updateUser.userName} onChange={(e) => setUpdateUser({ ...updateUser, userName: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" value={updateUser.fullName} onChange={(e) => setUpdateUser({ ...updateUser, fullName: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={updateUser.email} onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={updateUser.phoneNumber} onChange={(e) => setUpdateUser({ ...updateUser, phoneNumber: e.target.value })} />
                </div>
                {/*<div>*/}
                {/*    <label htmlFor="confirmPassword">Confirm Password</label>*/}
                {/*    <input type="password" id="confirmPassword" name="confirmPassword" />*/}
                {/*</div>*/}
                <button type="submit">Update</button>
            </form>
        </div>

    )
}