import React, { useState } from "react"
import "../css/Navbar.css"
import logo from "/Logo.png"
import ComponentPath from "routes/ComponentPath"

const Navbar = () => {
    const [menu, setMenu] = useState()
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(localStorage.getItem("user"))
    return (
        <div className="navbar">
            <div className="logoicon">
                <a href="/">
                    <img src={logo} className="logo" />
                </a>
                <h2>Koi Delivery</h2>
            </div>

            <ul className="navbar-menu">
                <li
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    <a href="/">Home</a>
                </li>
                <li
                    onClick={() => setMenu("services")}
                    className={menu === "services" ? "active" : ""}
                >
                    <a href="/services">Services</a>
                </li>
                <li
                    onClick={() => setMenu("news")}
                    className={menu === "news" ? "active" : ""}
                >
                    <a href="/news">News</a>
                </li>
                <li
                    onClick={() => setMenu("customer-support")}
                    className={menu === "customer-support" ? "active" : ""}
                >
                    <a href="/customer-support">Customer Support</a>
                </li>
            </ul>
            <div className="navbar-right">
                {/* {token !== null ? (
          user && user.roleId !== 1 ? (
            <>
              <a
                href={ComponentPath.admin.dashboard}
                style={{ margin: "0 10px 0 0" }}
              >
                <button>Admin</button>
              </a>
              <a href="/logout">
                <button>Log Out</button>
              </a>
            </>
          ) : (
            <>
              <a
                href={ComponentPath.user.dashboard}
                style={{ margin: "0 10px 0 0" }}
              >
                <button>User</button>
              </a>
              <a href="/logout">
                <button>Log Out</button>
              </a>
            </>
          )
        ) : (
          <a href="/login">
            <button>Sign In</button>
          </a>
        )} */}
                <a href="/login">
                    <button>Sign In</button>
                </a>
            </div>
        </div>
    )
}

export default Navbar
