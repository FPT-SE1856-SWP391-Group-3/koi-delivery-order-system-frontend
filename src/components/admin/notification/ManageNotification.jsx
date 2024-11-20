import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import ComponentPath from "routes/ComponentPath"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function ManageNotification() {
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        try {
            api.get("Notifications/").then((data) => {
                if (data.success) {
                    setNotifications(data.notifications)
                    console.log(data.notifications)
                } else {
                    console.log("No notifications found.")
                }
            })
        } catch (error) {
            UserToast(
                "error",
                "An error occurred while fetching notifications."
            )
        }
    }, [])

    async function deleteNotification(notificationId) {
        try {
            api.del("Notifications/" + notificationId).then((data) => {
                if (data.success) {
                    UserToast("success", "Deleted successfully!")
                    const newNotifications = notifications.filter(
                        (notification) =>
                            notification.notificationId !== notificationId
                    )
                    setNotifications(newNotifications)
                } else {
                    UserToast("error", "Delete failed!")
                }
            })
        } catch (error) {
            console.error("Error during deletion:", error)
            UserToast(
                "error",
                "An error occurred while deleting the notification."
            )
        }
    }

    return (
        <div>
            <ToastContainer />
            <h1>Notifications</h1>
            <a href={ComponentPath.admin.notification.createNotification}>
                Add Notification
            </a>
            {notifications.map((notification) => (
                <div key={notification.notificationId}>
                    <h3>NotificationId: {notification.notificationId}</h3>
                    <h3>Title: {notification.notificationTitle}</h3>
                    <h3>SenderId: {notification.senderId}</h3>
                    <h3>ReceiverId: {notification.receiverId}</h3>
                    <h3>Content: {notification.notificationContent}</h3>
                    <h3>SendDate: {notification.sendDate}</h3>
                    <button
                        onClick={() =>
                            deleteNotification(notification.notificationId)
                        }
                    >
                        Delete
                    </button>
                    {/* <a href={ + notification.notificationId}>
            Update
          </a> */}
                </div>
            ))}
        </div>
    )
}
