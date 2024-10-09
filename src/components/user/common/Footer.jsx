import React from "react";
import "../css/Footer.css";
import LOGO from "/Logo.png";
import facebookicon from "../../../assets/facebook_icon.png";
import twittericon from "../../../assets/twitter_icon.png";
import google from "../../../assets/google.png";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={LOGO} />
          <h2>KOI Delivery</h2>
          <p>
            The company delivers fish and related certificates (origin, health,
            awards, ...) to customers and provides support until the fish adapt
            to the new environment.
          </p>
          <div className="footer-social-icon">
            <img src={facebookicon} />
            <img src={google} />
            <img src={twittericon} />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+84-633-649-266</li>
            <li>koidelivety@koi.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Coppyright 2024 © KoiDelivety.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
