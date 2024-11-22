import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import {
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
    Button,
    Alert,
    AlertTitle,
    Slide,
} from "@mui/material"
import { Grid } from "@mui/joy"
import AdminSideMenu from "../../admin/components/AdminSideMenu"
import SideMenu from "../SideMenu"

export default function UpdatePassword() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const [passwordData, setPasswordData] = useState({
        userId: user.userId,
        oldPassword: "",
        newPassword: "",
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [showAlert, setShowAlert] = useState(false) // State to control alert visibility

    const navigate = useNavigate()
    const roleId = user?.roleId

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordData.newPassword !== confirmPassword) {
            setError("New Password and Confirm Password do not match.")
            setShowAlert(true)
            return
        }

        try {
            const response = await api.post(
                "Users/password/update",
                passwordData
            )

            if (response.success) {
                setSuccess(true)
                setError("")
                setShowAlert(true)
                setTimeout(() => {
                    navigate(-1)
                }, 2000)
            } else {
                setError(response.msg || "Password update failed!")
                setSuccess(false)
                setShowAlert(true)
            }
        } catch (error) {
            if (error.response && error.response) {
                setError(error.response.data.msg || "Wrong Password!")
            } else {
                console.error("Error:", error)
                setError("An unexpected error occurred. Please try again.")
            }
            setShowAlert(true)
        }
    }

    const renderSidebar = () => {
        if (roleId === 2) return <SideMenu />
        return <AdminSideMenu />
    }

    return (
        <Box sx={{ display: "flex" }}>
            {renderSidebar()}
            <Box sx={{ flexGrow: 1, marginInline: "2em" }}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Update Password
                        </Typography>
                        {/* Display success or error alert */}
                        {showAlert && (
                            <Slide
                                direction="down"
                                in={showAlert}
                                mountOnEnter
                                unmountOnExit
                            >
                                <Alert
                                    severity={success ? "success" : "error"}
                                    sx={{
                                        mb: 2,
                                        boxShadow: 3,
                                        animation: "fadeIn 0.5s",
                                    }}
                                    onClose={() => setShowAlert(false)}
                                >
                                    <AlertTitle>
                                        {success ? "Success" : "Error"}
                                    </AlertTitle>
                                    {success
                                        ? "Password updated successfully! Redirecting..."
                                        : error}
                                </Alert>
                            </Slide>
                        )}
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
                                    <TextField
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
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
        </Box>
    )
}
