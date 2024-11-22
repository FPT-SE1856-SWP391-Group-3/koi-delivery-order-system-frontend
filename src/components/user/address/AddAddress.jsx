import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../../../api/CallAPI"
import axios from "axios"
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
    FormHelperText,
} from "@mui/material"

export default function AddAddress({ closeModal }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const userId = JSON.parse(localStorage.getItem("userId"))
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
            const response = await api.post("Addresses/", requestData)
            if (response.success) {
                UserToast("success", "Address added successfully!")
                // closeModal()
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                UserToast("error", "Failed to add address!")
            }
        } catch (error) {
            console.error("Error during address submission:", error)
            UserToast("error", "Failed to add address!")
        }
    }

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
                )
                setAddresses(response.data)
            } catch (error) {
                console.error("Error fetching addresses:", error)
            }
        }
        fetchAddresses()
    }, [])

    const handleChange = (e) => {
        if (cityName && districtName && wardName) {
            setAddressLine(
                e.target.value
                    ? `${e.target.value}, ${wardName}, ${districtName}, ${cityName}`
                    : ""
            )
        }
    }

    return (
        <Box sx={{ padding: "2rem" }}>
            <ToastContainer />
            <Typography variant="h4" textAlign="center" gutterBottom>
                Add Address
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type="hidden"
                    id="userId"
                    name="userId"
                    value={userId}
                    {...register("userId")}
                />
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.cityName}
                >
                    <InputLabel>City</InputLabel>
                    <Select
                        {...register("cityName", {
                            required: "City is required",
                        })}
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        label="City"
                    >
                        <MenuItem value="">Select City</MenuItem>
                        {addresses.map((address) => (
                            <MenuItem key={address.Id} value={address.Name}>
                                {address.Name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.cityName?.message}</FormHelperText>
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.districtName}
                >
                    <InputLabel>District</InputLabel>
                    <Select
                        {...register("districtName", {
                            required: "District is required",
                        })}
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                        label="District"
                    >
                        <MenuItem value="">Select District</MenuItem>
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
                    <FormHelperText>
                        {errors.districtName?.message}
                    </FormHelperText>
                </FormControl>
                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.wardName}
                >
                    <InputLabel>Ward</InputLabel>
                    <Select
                        {...register("wardName", {
                            required: "Ward is required",
                        })}
                        value={wardName}
                        onChange={(e) => setWardName(e.target.value)}
                        label="Ward"
                    >
                        <MenuItem value="">Select Ward</MenuItem>
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
                    <FormHelperText>{errors.wardName?.message}</FormHelperText>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Specific Address"
                    {...register("specificAddress", {
                        required:
                            cityName && districtName && wardName
                                ? "Specific Address is required"
                                : false,
                        onChange: handleChange,
                    })}
                    disabled={!cityName || !districtName || !wardName}
                    error={!!errors.specificAddress}
                    helperText={
                        !cityName || !districtName || !wardName
                            ? "Fill City, District, and Ward first"
                            : errors.specificAddress?.message
                    }
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Full Address"
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
                    Add
                </Button>
            </form>
        </Box>
    )
}
