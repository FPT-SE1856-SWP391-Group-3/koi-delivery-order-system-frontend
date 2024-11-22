import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../../../../api/CallAPI"
import "../../css/CreateOrder.css"
import UserToast from "../../alert/UserToast"
import { Link, useNavigate } from "react-router-dom"
import ComponentPath from "../../../../routes/ComponentPath"

const SenderInfo = ({ onChange }) => {
    const [senderInfo, setSenderInfo] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        birthDate: "",
        userId: "",
        addressLine: "",
        city: "",
        country: "",
        serviceType: "domestic",
    })
    const [addresses, setAddresses] = useState([])
    const navigate = useNavigate()

    const userId = JSON.parse(localStorage.getItem("user"))?.userId

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await api.get(`users/${userId}`)
                if (userResponse.success) {
                    setSenderInfo((prevInfo) => ({
                        ...prevInfo,
                        fullName: userResponse.user?.userName || "",
                        email: userResponse.user?.email || "",
                        phoneNumber: userResponse.user?.phoneNumber || "",
                        birthDate: userResponse.user?.birthDate || "",
                        userId: userResponse.user?.userId || "",

                        serviceType:
                            userResponse.user?.serviceType || "domestic",
                    }))
                } else {
                    UserToast("error", "User not found. Please log in again.")
                }

                const addressResponse = await api.get(
                    `addresses/user/${userId}`
                )
                if (
                    addressResponse.success &&
                    addressResponse.address.length > 0
                ) {
                    setAddresses(addressResponse.address)
                    // setSenderInfo((prevInfo) => ({
                    //     ...prevInfo,
                    //     addressLine: addressLine || "",
                    // }))
                } else {
                    // alert("Failed to retrieve address information!");
                }
            } catch (error) {
                console.error("Error fetching data:", error)
                UserToast(
                    "error",
                    "An error occurred while fetching user data."
                )
            }
        }

        if (userId) fetchUserData()
    }, [userId])

    useEffect(() => {
        onChange(senderInfo)
    }, [senderInfo, onChange])

    const handleOnChange = (e) => {
        const { value } = e.target
        if (value === "new") {
            navigate(ComponentPath.user.address.viewAddress)
            return
        }
        setSenderInfo((prevInfo) => ({
            ...prevInfo,
            addressLine: value || "",
        }))
        onChange(senderInfo)
    }



    return (
        <div>
            <h2>Sender Information</h2>
            <div className="sectionCompo">
                <label>Sender Name</label>
                <input type="text" value={senderInfo.fullName} readOnly />
                <div>
                    <label>Address Line</label>
                    <select onChange={handleOnChange}>
                        <option value="">Select an address</option>
                        <option value="new">Add an address</option>
                        {addresses.map((address) => (
                            <option
                                key={address.addressId}
                                value={address.addressLine}
                            >
                                {address.addressLine}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

// Xác nhận prop types
SenderInfo.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default SenderInfo
