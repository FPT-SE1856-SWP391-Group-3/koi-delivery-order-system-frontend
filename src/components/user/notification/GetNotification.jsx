import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../common/Header";

export default function GetNotification() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        try {
            console.log(user.userId);
            api.get("Notifications/" + user.userId).then((data) => {

              if (data.success) {
                setNotifications(data.notifications);
                console.log(data.notifications);
              } else {
                console.log("Không có thông báo!");
              }
            });
        } catch (error) {
            alert("An error has occurred. Please try again.");
        }
    }, [user.userId]);

    async function deleteNotification(notificationId) {
        try {
           api.del("Notifications/" + notificationId).then((data) => {
             if (data.success) {
               alert("Xóa thành công!");
               const newNotifications = notifications.filter(
                 (notification) =>
                   notification.notificationId !== notificationId
               );
               setNotifications(newNotifications);
             } else {
               alert("Xóa thất bại!");
             }
           });
        } catch (error) {
            console.error("Error during deletion:", error);
            alert("An error occurred during deletion. Please try again.");
        }
    }

    return (
        <div>
            <Header />
            <h1>Notifications</h1>
            <a href="/add-notification">Add Notification</a>
            {notifications.map((notification) => (
                <div key={notification.notificationId}>
                    <h3>NotificationId: {notification.notificationId}</h3>  
                    <h3>Title: {notification.notificationTitle}</h3>
                    <h3>SenderId: {notification.senderId}</h3>
                    <h3>ReceiverId: {notification.receiverId}</h3>
                    <h3>Content: {notification.notificationContent}</h3>
                    <h3>SendDate: {notification.sendDate}</h3>
                    <button onClick={() => deleteNotification(notification.notificationId)}>Delete</button>
                    <a href={"/admin/updateNotification/" + notification.notificationId}>Update</a>
                </div>
            ))}
        </div>
    );
}
