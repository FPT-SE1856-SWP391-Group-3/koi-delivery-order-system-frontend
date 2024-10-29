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
          <img src={LOGO} alt="Koi Delivery Logo" className="footer-logo" />
          <h2>KOI Delivery</h2>
          <p>
            At KOI Delivery, we specialize in the safe and efficient
            transportation of koi fish, ensuring the highest standards of care
            throughout their journey. We deliver your prized koi with utmost
            care and expertise.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/groups/1138143253898041">
              <img src={facebookicon} alt="Facebook" />
            </a>
            <a href="https://google.com">
              <img src={google} alt="Google" />
            </a>
            <a href="https://twitter.com">
              <img src={twittericon} alt="Twitter" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+84-633-649-266</li>
            <li>koidelivery@koi.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © KoiDelivery.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
