import { useState } from "react";
import "./../css/Header.css";
import LOGO from "/Logo.png";

export default function Header() {

 // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className='header'>
      <div className="header-content">
      </div>
    </div>

      /*{ <header className="site-header">
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
                <a href="/login">Register/login</a>
              </li>
            )}
          </ul>
        </nav>
      </header> }*/
  
  );
}
