import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Box,
} from "@mui/material"
import api from "../../../api/CallAPI"

import SideMenu from "../SideMenu"
import UserAppBar from "../UserAppNavbar"

export default function GetNotification() {
    const [notifications, setNotifications] = useState([])
    const [selectedNotification, setSelectedNotification] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        try {
            console.log(user.userId)
            api.get("Notifications/" + user.userId).then((data) => {
                if (data.success) {
                    setNotifications(data.notifications)
                    console.log(data.notifications)
                } else {
                    console.log("Không có thông báo!")
                }
            })
        } catch (error) {
            alert("An error has occurred. Please try again.")
        }
    }, [user.userId])

    async function deleteNotification(notificationId) {
        try {
            api.del("Notifications/" + notificationId).then((data) => {
                if (data.success) {
                    alert("Xóa thành công!")
                    const newNotifications = notifications.filter(
                        (notification) =>
                            notification.notificationId !== notificationId
                    )
                    setNotifications(newNotifications)
                } else {
                    alert("Xóa thất bại!")
                }
            })
        } catch (error) {
            console.error("Error during deletion:", error)
            alert("An error occurred during deletion. Please try again.")
        }
    }

    function handleShowModal(notification) {
        setSelectedNotification(notification)
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
        setSelectedNotification(null)
    }

    function truncateContent(content, wordLimit) {
        const words = content.split(" ")
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : content
    }

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <SideMenu />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <UserAppBar />
                    <Box sx={{ p: 2 }}>
                        <h1>Notifications</h1>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>NotificationId</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>SenderId</TableCell>
                                        <TableCell>Content</TableCell>
                                        <TableCell>SendDate</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {notifications.map((notification) => (
                                        <TableRow
                                            key={notification.notificationId}
                                        >
                                            <TableCell>
                                                {notification.notificationId}
                                            </TableCell>
                                            <TableCell>
                                                {notification.notificationTitle}
                                            </TableCell>
                                            <TableCell>
                                                {notification.senderId}
                                            </TableCell>
                                            <TableCell>
                                                {truncateContent(
                                                    notification.notificationContent,
                                                    10
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {notification.sendDate}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    style={{
                                                        marginRight: "1em",
                                                    }}
                                                    onClick={() =>
                                                        deleteNotification(
                                                            notification.notificationId
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() =>
                                                        handleShowModal(
                                                            notification
                                                        )
                                                    }
                                                >
                                                    Xem đầy đủ
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Dialog
                        open={showModal}
                        onClose={handleCloseModal}
                        maxWidth="lg"
                    >
                        <DialogTitle>Full Notification Content</DialogTitle>
                        <DialogContent>
                            {selectedNotification
                                ? selectedNotification.notificationContent
                                : ""}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </div>
    )
}
