import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import ComponentPath from "routes/ComponentPath"
import InforColumn from "../props/InforColumn"
import avatar from "../../../assets/avatar.png"
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
} from "@mui/material"
import SideMenu from "../SideMenu" // Assuming you have this component
import AdminSideMenu from "../../admin/components/AdminSideMenu"
import { Grid } from "@mui/joy"
import UserAppNavbar from "../UserAppNavbar"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function ViewProfile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const navigate = useNavigate()

    // Check user role ID from local storage
    const roleId = user?.roleId

    // Define roles mapping
    const roleMapping = {
        2: "Customer",
        3: "Sales Staff",
        4: "Delivery Staff",
        5: "Manager",
    }

    const userRole = roleMapping[roleId] || "Unknown Role"

    // Function to delete user
    const deleteUser = async (e) => {
        e.preventDefault()
        try {
            api.del("users").then((data) => {
                if (data.success) {
                    UserToast("success", "Delete user successfully!")
                    localStorage.removeItem("user")
                    navigate("/")
                } else {
                    UserToast("error", "Delete user failed!")
                }
            })
        } catch (error) {
            console.error("Error during deletion:", error)
            UserToast("error", "An error occurred while deleting the user.")
        }
    }

    // Conditionally render the correct sidebar based on roleId
    const renderSidebar = () => {
        if (roleId === 2) return <SideMenu />
        return <AdminSideMenu />
    }

    return (
        <Box sx={{ display: "flex" }}>
            <ToastContainer />
            {renderSidebar()}
            <Box sx={{ flexGrow: 1 }}>
                <UserAppNavbar />
                <Grid container spacing={3} paddingInline={3}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Avatar
                                        src={avatar}
                                        alt={user.fullName || "User"}
                                        sx={{ width: 150, height: 150 }}
                                    />
                                    <Typography variant="h4" sx={{ mt: 2 }}>
                                        {user.fullName}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="textSecondary"
                                    >
                                        {userRole}
                                    </Typography>
                                    <Stack spacing={2} sx={{ mt: 2 }}>
                                        {/* <Button variant="contained">
                                            <Link
                                                to={
                                                    ComponentPath.user.payment
                                                        .viewPayment
                                                }
                                            >
                                                View Payment
                                            </Link>
                                        </Button> */}
                                        <Button variant="outlined">
                                            <Link
                                                to={
                                                    ComponentPath.user.user
                                                        .updatePassword
                                                }
                                            >
                                                Update Password
                                            </Link>
                                        </Button>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Right Side */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <InforColumn
                                    element="Full Name"
                                    value={user.fullName}
                                />
                                <Divider sx={{ my: 2 }} />
                                <InforColumn
                                    element="User Name"
                                    value={user.userName}
                                />
                                <Divider sx={{ my: 2 }} />
                                <InforColumn
                                    element="Phone"
                                    value={user.phoneNumber}
                                />
                                <Divider sx={{ my: 2 }} />
                                <Button
                                    variant="contained"
                                    color="info"
                                    href={
                                        ComponentPath.user.address.viewAddress
                                    }
                                >
                                    View Address
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
