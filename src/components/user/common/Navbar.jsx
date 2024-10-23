import React, { useState } from "react";
import "../css/Navbar.css";
import logo from "/Logo.png";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
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
        <li
          onClick={() => setMenu("recruitment")}
          className={menu === "recruitment" ? "active" : ""}
        >
          <a href="/recruitment">Recruitment</a>
        </li>
      </ul>
      <div className="navbar-right">
        <a href="/login">
          <button>Sign In</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
