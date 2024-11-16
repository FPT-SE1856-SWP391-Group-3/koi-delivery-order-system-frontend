import React, { useState } from "react"
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

export default function ViewProfile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const navigate = useNavigate()

    // Check user role ID from local storage
    const roleId = user?.roleId

    // Function to delete user
    const deleteUser = async (e) => {
        e.preventDefault()
        try {
            api.del("Users").then((data) => {
                if (data.success) {
                    alert("Xóa thành công!")
                    localStorage.removeItem("user")
                    navigate("/")
                } else {
                    alert("Xóa thất bại!")
                }
            })
        } catch (error) {
            console.error("Error during deletion:", error)
            alert("An error occurred. Please try again.")
        }
    }

    // Conditionally render the correct sidebar based on roleId
    const renderSidebar = () => {
        return roleId === 2 ? <SideMenu /> : <AdminSideMenu />
    }

    return (
        <Box sx={{ display: "flex" }}>
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
                                        alt="Admin"
                                        sx={{ width: 150, height: 150 }}
                                    />
                                    <Typography variant="h4" sx={{ mt: 2 }}>
                                        {user.fullName}
                                    </Typography>
                                    <Stack spacing={2} sx={{ mt: 2 }}>
                                        <Button variant="contained">
                                            <Link
                                                to={
                                                    ComponentPath.user.payment
                                                        .viewPayment
                                                }
                                            >
                                                View Payment
                                            </Link>
                                        </Button>
                                        <Button variant="contained">
                                            <Link
                                                to={
                                                    ComponentPath.user.payment
                                                        .editPayment
                                                }
                                            >
                                                Edit Payment
                                            </Link>
                                        </Button>
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
