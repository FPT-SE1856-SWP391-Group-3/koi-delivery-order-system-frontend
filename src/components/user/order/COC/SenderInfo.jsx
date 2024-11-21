import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../../../../api/CallAPI"
import "../../css/CreateOrder.css"
import { Grid } from "@mui/joy"
import UserToast from "../../alert/UserToast"

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
                    const { addressLine } = addressResponse.address[0]
                    setSenderInfo((prevInfo) => ({
                        ...prevInfo,
                        addressLine: addressLine || "",
                    }))
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

    return (
        <div>
            <h2>Sender Information</h2>
            <div className="sectionCompo">
                <label>Sender Name</label>
                <input type="text" value={senderInfo.fullName} readOnly />

                <div>
                    <label>Address Line</label>
                    <input
                        type="text"
                        placeholder="Enter address line"
                        value={senderInfo.addressLine}
                        readOnly
                    />
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
