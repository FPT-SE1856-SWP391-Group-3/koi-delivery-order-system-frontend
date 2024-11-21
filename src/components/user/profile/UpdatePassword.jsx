import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import {
    Box,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
    Button,
} from "@mui/material"
import { Grid } from "@mui/joy"
import UserSideNav from "../UserSideNav"
import UserToast from "../alert/UserToast"
import ComponentPath from "../../../routes/ComponentPath"
import { ToastContainer } from "react-toastify"
export default function UpdatePassword() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const [passwordData, setPasswordData] = useState({
        userId: user.userId,
        oldPassword: "",
        newPassword: "",
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Call API to update password
            api.put("users/password/update", passwordData).then((data) => {
                if (data.success) {
                    UserToast("success", "Password updated successfully!")
                    navigate(ComponentPath.user.profile.viewProfile)
                } else {
                    UserToast("error", "Failed to update password!")
                }
            })
        } catch (error) {
            console.error("Error:", error)
            UserSideNav(
                "error",
                "An error occurred during update. Please try again."
            )
        }
    }

    return (
        <UserSideNav>
            <ToastContainer />
            <Box sx={{ marginInline: "2em" }}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Update Password
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Old Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                oldPassword: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="New Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Update Password
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </UserSideNav>
    )
}
