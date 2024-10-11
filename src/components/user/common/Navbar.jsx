import React, { useState } from "react";
import "../css/Navbar.css";
import logo from "/Logo.png";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <div className="logoicon">
        <img src={logo} className="logo" />
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
          Services
        </li>
        <li
          onClick={() => setMenu("news")}
          className={menu === "news" ? "active" : ""}
        >
          News
        </li>
        <li
          onClick={() => setMenu("customer-support")}
          className={menu === "customer-support" ? "active" : ""}
        >
          {" "}
          Customer Support
        </li>
        <li
          onClick={() => setMenu("recruitment")}
          className={menu === "recruitment" ? "active" : ""}
        >
          Recruitment
        </li>
      </ul>
      <div className="navbar-right">
        <img src="" />
        <a href="/login">
          <button>Sign In</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
