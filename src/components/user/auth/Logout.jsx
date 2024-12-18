import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
export default function Logout() {
    const navigate = useNavigate()
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    useEffect(() => {
        navigate("/")
    })
}
