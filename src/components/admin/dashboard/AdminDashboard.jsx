import Sidebar from "@components/user/common/Sidebar";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <>
      {" "}
      <Sidebar />
      <div className="content-container">
        <h1>Dashboard</h1>
      </div>
    </>
  );
}
