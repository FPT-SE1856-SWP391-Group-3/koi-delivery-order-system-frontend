import React, { useEffect, useState } from "react"
import axios from "axios"
import "../../css/CreateOrder.css"
import UserToast from "../../alert/UserToast"
import { ToastContainer } from "react-toastify"

const ReceiverInfo = () => {
    const [phoneCodes, setPhoneCodes] = useState([]) // State for phone country codes
    const [phoneCountryCode, setPhoneCountryCode] = useState("+84") // Default to Vietnam's code
    const [phoneNumber, setPhoneNumber] = useState("")
    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")

    // Fetch phone codes once
    useEffect(() => {
        const fetchPhoneCodes = async () => {
            try {
                const response = await axios.get(
                    "https://restcountries.com/v3.1/all"
                )
                const codes = response.data.map((country) => ({
                    name: country.name.common,
                    code: `+${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`,
                }))
                setPhoneCodes(codes)
            } catch (error) {
                console.error("Error fetching phone codes:", error)
                UserToast(
                    "error",
                    "An error occurred while fetching phone codes."
                )
            }
        }

        fetchPhoneCodes()
    }, [])

    return (
        <div className="section">
            <ToastContainer />
            <h2>Receiver Information</h2>
            <div className="sectionCompo">
                <label>Phone Number</label>
                <div className="phone-input">
                    <select
                        value={phoneCountryCode}
                        onChange={(e) => setPhoneCountryCode(e.target.value)}
                    >
                        {phoneCodes.map((code) => (
                            <option key={code.code} value={code.code}>
                                {code.name} ({code.code})
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <label>Full Name</label>
                <input
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <label>Address</label>
                <input
                    type="text"
                    placeholder="Enter detailed address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
        </div>
    )
}

export default ReceiverInfo
