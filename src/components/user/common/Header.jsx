import { useState } from "react";
import "./../css/Header.css";

export default function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <header className="site-header">
        <div className="site-identity">
          <h1>
            <a href="/">Site Name</a>
          </h1>
        </div>
        <nav className="site-navigation">
          <ul className="nav">
            {user ? (
              <>
                <li>
                  <a href="/view-profile">{user.userName}</a>
                </li>
                <li>
                  <a href="/logout">Logout</a>
                </li>
                <li>
                  <a href="/orders">Order</a>
                </li>
                <li>
                  <a href="/create-order">Create Order</a>
                </li>
                <li>
                  <a href="/manage-feedback">Manage Feedback</a>
                </li>
                {user.roleId >= 3 ? (
                  <li>
                    <a href="/admin/manage-user">Admin</a>
                  </li>
                ) : null}
              </>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
