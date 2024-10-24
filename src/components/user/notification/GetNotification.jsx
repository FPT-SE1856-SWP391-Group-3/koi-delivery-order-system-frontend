import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'; // Import Modal và Button từ react-bootstrap
import api from "../../../api/CallAPI";
import UserSidebar from "../common/UserSidebar";
import Bootstrap from "../props/Bootstrap";

export default function GetNotification() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null); // Trạng thái cho thông báo được chọn
  const [showModal, setShowModal] = useState(false); // Trạng thái điều khiển modal
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
            (notification) => notification.notificationId !== notificationId
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

  // Hàm hiển thị modal với nội dung đầy đủ của notification
  function handleShowModal(notification) {
    setSelectedNotification(notification);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedNotification(null);
  }

  // Hàm giới hạn số lượng từ hiển thị
  function truncateContent(content, wordLimit) {
    const words = content.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : content;
  }

  return (
    <div>
      <UserSidebar />
      <Bootstrap />
      <div className="content">
        <h1>Notifications</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>NotificationId</th>
              <th>Title</th>
              <th>SenderId</th>
              <th>Content</th>
              <th>SendDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.notificationId}>
                <td>{notification.notificationId}</td>
                <td>{notification.notificationTitle}</td>
                <td>{notification.senderId}</td>
                <td>{truncateContent(notification.notificationContent, 10)}</td> {/* Hiển thị giới hạn 10 từ */}
                <td>{notification.sendDate}</td>
                <td>
                  <button className="btn btn-primary col-lg-3" style={{marginRight: "1em"}} onClick={() => deleteNotification(notification.notificationId)}>Delete</button>
                  <button className="btn btn-secondary col-lg-5" onClick={() => handleShowModal(notification)}>Xem đầy đủ</button> {/* Nút hiển thị modal */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal hiển thị đầy đủ nội dung */}
        <Modal show={showModal} onHide={handleCloseModal} className="modal-lg">
          <Modal.Header closeButton>
            <Modal.Title>Full Notification Content</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedNotification ? selectedNotification.notificationContent : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
