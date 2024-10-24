import Sidebar from "@components/user/common/Sidebar";
import "./UserDashboard.css";
import UserSidebar from "../common/UserSidebar";

export default function UserDashboard() {
  return (
    <>
      {" "}
      <UserSidebar />
      <div className="content-container">
        <h1>Dashboard</h1>
      </div>
    </>
  );
}
