import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Logout() {
    const navigate = useNavigate();
    localStorage.removeItem('user');

    useEffect(() => {
        navigate("/");
    });
    return (
        <h1>Log out</h1>
    )
}