import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../../api/CallAPI';
import Header from '../common/Header';

export default function UpdatePassword() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [passwordData, setPasswordData] = useState({
        userId: user.userId,
        oldPassword: '',
        newPassword: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {   
            // Call API to update password
            api.put('Users/update-password', passwordData)
                .then(data => {
                    if (data.success) {
                        alert('Password updated successfully!');
                        navigate('/');
                    } else {
                        alert('Password update failed!');
                    }
                });
        } catch (error) {
            console.error("Error:", error);
            alert("Error! Please try again.");
        }
    }

    return (
        <div>
            {/* <Header/> */}
            <h1>Update Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="oldPassword">Old Password</label>
                    <input 
                        type="password" 
                        id="oldPassword" 
                        name="oldPassword" 
                        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                        type="password" 
                        id="newPassword" 
                        name="newPassword" 
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} 
                        required 
                    />
                </div>
                <button type="submit">Update Password</button>
            </form>
        </div>
    )
}
