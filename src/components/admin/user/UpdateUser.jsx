import api from "../../../api/CallAPI"
import { useState } from "react"
import { useEffect } from "react"
import { Box, TextField, Button, Typography } from "@mui/material"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function UpdateUser({ userId, onUpdateSuccess }) {
    const [updateUser, setUpdateUser] = useState({
        userName: "",
        fullName: "",
        email: "",
        phoneNumber: "",
    })

    // Fetch user details when `userId` is provided
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await api.get(`users/${userId}`)
                if (data.success) {
                    setUpdateUser({
                        userName: data.user.userName || "",
                        fullName: data.user.fullName || "",
                        email: data.user.email || "",
                        phoneNumber: data.user.phoneNumber || "",
                    })
                } else {
                    UserToast("error", "User not found!")
                }
            } catch (error) {
                console.error("Error fetching user:", error)
                UserToast(
                    "error",
                    "An error occurred while fetching user data."
                )
            }
        }
        if (userId) fetchUser()
    }, [userId])

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateUser((prev) => ({ ...prev, [name]: value }))
    }

    // Handle form submission for updating user data
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await api.put(`users/${userId}`, updateUser)
            if (data.success) {
                UserToast("success", "User updated successfully!")
                onUpdateSuccess() // Call the onUpdateSuccess callback to refresh the table and close the modal
            } else {
                UserToast("error", "Failed to update user!")
            }
        } catch (error) {
            console.error("Error updating user:", error)
            UserToast("error", "An error occurred. Please try again.")
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: "100%",
                maxWidth: 400,
                mx: "auto",
                bgcolor: "background.paper",
                boxShadow: 3,
                p: 3,
                borderRadius: 2,
                textAlign: "center",
            }}
        >
            <ToastContainer />
            <Typography
                variant="h5"
                component="h1"
                fontWeight={600}
                gutterBottom
            >
                Update Profile
            </Typography>

            <TextField
                label="User Name"
                name="userName"
                value={updateUser.userName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true, // Prevents label from overlapping when focused
                    style: { color: "rgba(0, 0, 0, 0.6)" }, // Adjust label color
                }}
                InputProps={{
                    style: { borderRadius: 4 }, // Adjust border radius to prevent overlap
                }}
            />
            <TextField
                label="Full Name"
                name="fullName"
                value={updateUser.fullName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                    style: { color: "rgba(0, 0, 0, 0.6)" },
                }}
                InputProps={{
                    style: { borderRadius: 4 },
                }}
            />

            <TextField
                label="Email"
                name="email"
                value={updateUser.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="email"
            />
            <TextField
                label="Phone Number"
                name="phoneNumber"
                value={updateUser.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="tel"
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, py: 1.2 }}
            >
                UPDATE
            </Button>
        </Box>
    )
}
