import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import axios from "axios"
import ComponentPath from "../../../routes/ComponentPath"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
} from "@mui/material"

export default function AddAddress() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    let userId = JSON.parse(localStorage.getItem("userId"))
    const [cityName, setCityName] = useState("")
    const [districtName, setDistrictName] = useState("")
    const [wardName, setWardName] = useState("")
    const [addressLine, setAddressLine] = useState("")
    const [addresses, setAddresses] = useState([])

    // Add address function
    const onSubmit = async (data) => {
        const requestData = {
            userId: data.userId,
            addressLine: addressLine,
        }
        try {
            await api.post("Addresses/", requestData).then((data) => {
                if (data.success) {
                    UserToast("success", "Thêm thành công!")
                    window.location.reload()
                } else {
                    UserToast("error", "Thêm thất bại!")
                }
            })
        } catch (error) {
            console.error("Error during registration:", error)
            UserToast("error", "Thêm thất bại!")
        }
    }

    useEffect(() => {
        axios
            .get(
                "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
            )
            .then((response) => response.data)
            .then((data) => {
                setAddresses(data)
            })
    }, [])

    const handleChange = (e) => {
        if (cityName && districtName && wardName) {
            if (e.target.value !== "") {
                setAddressLine(
                    `${e.target.value}, ${wardName}, ${districtName}, ${cityName}`
                )
            } else {
                setAddressLine("")
            }
        }
    }

    return (
        <Box sx={{ padding: "2rem" }}>
            <ToastContainer />
            <Typography variant="h4" textAlign="center" gutterBottom>
                Thêm địa chỉ mới
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type="hidden"
                    id="userId"
                    name="userId"
                    value={userId}
                    {...register("userId")}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Thành phố</InputLabel>
                    <Select
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        label="Thành phố"
                    >
                        <MenuItem value="">Chọn thành phố</MenuItem>
                        {addresses.map((address) => (
                            <MenuItem key={address.Id} value={address.Name}>
                                {address.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Huyện</InputLabel>
                    <Select
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                        label="Huyện"
                    >
                        <MenuItem value="">Chọn huyện</MenuItem>
                        {addresses
                            .filter((address) => address.Name === cityName)
                            .flatMap((address) =>
                                address.Districts.map((district) => (
                                    <MenuItem
                                        key={district.Id}
                                        value={district.Name}
                                    >
                                        {district.Name}
                                    </MenuItem>
                                ))
                            )}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Quận/Xã</InputLabel>
                    <Select
                        value={wardName}
                        onChange={(e) => setWardName(e.target.value)}
                        label="Quận/Xã"
                    >
                        <MenuItem value="">Chọn quận/xã</MenuItem>
                        {addresses
                            .filter((address) => address.Name === cityName)
                            .flatMap((address) =>
                                address.Districts.filter(
                                    (district) => district.Name === districtName
                                ).flatMap((district) =>
                                    district.Wards.map((ward) => (
                                        <MenuItem
                                            key={ward.Id}
                                            value={ward.Name}
                                        >
                                            {ward.Name}
                                        </MenuItem>
                                    ))
                                )
                            )}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Địa chỉ cụ thể"
                    id="specificAddress"
                    name="specificAddress"
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Địa chỉ"
                    id="addressLine"
                    name="addressLine"
                    value={addressLine}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "1rem" }}
                >
                    Thêm
                </Button>
            </form>
        </Box>
    )
}
