import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import UserSideNav from "../UserSideNav"
import { Button, Card, CardContent } from "@mui/material"

export default function EditProfile() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const [updateUser, setUpdateUser] = useState({
        email: user.email,
        userName: user.userName,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Goi api update user
            api.put("Users/" + user.userId, updateUser).then((data) => {
                if (data.success) {
                    alert("Cập nhật thành công!")
                    localStorage.setItem("user", JSON.stringify(data.user))
                    navigate("/")
                } else {
                    alert("Cập nhật thất bại!")
                }
            })
        } catch (error) {
            console.error("Error:", error)
            alert("Error! Please try again.")
        }
    }

    return (
        <>
            <UserSideNav>
                <Card sx={{ marginInline: "1em" }}>
                    <CardContent>
                        <div>
                            <div className="card">
                                <div className="card-header">
                                    <h1>Update Profile</h1>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label
                                                htmlFor="username"
                                                className="form-group"
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={updateUser.userName}
                                                className="form-control"
                                                onChange={(e) =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        userName:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="fullname">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="fullname"
                                                name="fullname"
                                                className="form-control"
                                                value={updateUser.fullName}
                                                onChange={(e) =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        fullName:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                value={updateUser.email}
                                                onChange={(e) =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phoneNumber">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                className="form-control"
                                                value={updateUser.phoneNumber}
                                                onChange={(e) =>
                                                    setUpdateUser({
                                                        ...updateUser,
                                                        phoneNumber:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        {/*<div>*/}
                                        {/*    <label htmlFor="confirmPassword">Confirm Password</label>*/}
                                        {/*    <input type="password" id="confirmPassword" name="confirmPassword" />*/}
                                        {/*</div>*/}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Update
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </UserSideNav>
        </>
    )
}
