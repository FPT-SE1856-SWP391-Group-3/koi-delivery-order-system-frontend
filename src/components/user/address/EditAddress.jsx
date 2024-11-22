import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import api from "../../../api/CallAPI"
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

export default function EditAddress({ addressId, closeModal }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()
    const [updateAddress, setUpdateAddress] = useState({ addressLine: "" })
    const [currentAddress, setCurrentAddress] = useState("")
    const [addresses, setAddresses] = useState([])
    const [cityName, setCityName] = useState("")
    const [districtName, setDistrictName] = useState("")
    const [wardName, setWardName] = useState("")
    const [specificAddress, setSpecificAddress] = useState("")

    useEffect(() => {
        // Fetch current address data by ID
        const fetchAddress = async () => {
            try {
                api.get("Addresses/" + addressId).then((data) => {
                    if (data.success) {
                        console.log(data.address)
                        setCurrentAddress(data.address.addressLine)

                        const addressParts =
                            data.address.addressLine.split(", ")
                        setSpecificAddress(addressParts[0])
                        setValue("specificAddress", addressParts[0])

                        setCityName(addressParts[3])
                        setDistrictName(addressParts[2])
                        setWardName(addressParts[1])
                    } else {
                        UserToast("error", "No address found.")
                    }
                })
            } catch (error) {
                console.error("Error fetching address:", error)
                UserToast(
                    "error",
                    "An error occurred while fetching the address."
                )
            }
        }

        fetchAddress()
    }, [addressId, setValue])

    const onSubmit = async (data) => {
        try {
            await api
                .put("Addresses/" + addressId, {
                    addressLine: `${specificAddress}, ${wardName}, ${districtName}, ${cityName}`,
                })
                .then((response) => {
                    if (response.success) {
                        UserToast("success", "Address updated successfully!")
                        //closeModal()
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    } else {
                        UserToast("error", "Failed to update address!")
                    }
                })
        } catch (error) {
            console.error("Error during update:", error)
            UserToast("error", "An error occurred. Please try again.")
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
        setSpecificAddress(e.target.value)
    }

    return (
        <Box sx={{ padding: "2rem" }}>
            <ToastContainer />
            <Typography variant="h4" textAlign="center" gutterBottom>
                Update Address
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        onChange={(e) => {
                            setCityName(e.target.value)
                        }}
                        label="City"
                    >
                        <MenuItem value="">Choose City</MenuItem>
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
                        onChange={(e) => {
                            setDistrictName(e.target.value)
                        }}
                        label="District"
                    >
                        <MenuItem value="">Choose District</MenuItem>
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
                        onChange={(e) => {
                            setWardName(e.target.value)
                        }}
                        label="Ward"
                    >
                        <MenuItem value="">Choose Ward</MenuItem>
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
                    value={specificAddress}
                    {...register("specificAddress", {
                        required:
                            cityName && districtName && wardName
                                ? "Specific address is required"
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
                    label={`Current Address: ${currentAddress}`}
                    value={updateAddress.addressLine}
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
                    Update
                </Button>
            </form>
        </Box>
    )
}
