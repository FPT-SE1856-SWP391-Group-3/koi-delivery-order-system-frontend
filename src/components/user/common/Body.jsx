import React, { useState } from "react";
import "../css/Body.css";
import icon1 from "../../../assets/icon1.png";
import icon2 from "../../../assets/icon2.png";
import icon3 from "../../../assets/icon3.png";

const Body = () => {
  const [button, setButton] = useState("search");
  const [selector, setSelector] = useState("consignment");
  return (
    <div className="body-container">
      <ul className="button">
        <li>
          <button
            onClick={() => setButton("search")}
            className={button === "search" ? "active" : ""}
          >
            Tracking
          </button>
        </li>
        <li>
          <button
            onClick={() => setButton("services")}
            className={button === "services" ? "active" : ""}
          >
            Services
          </button>
        </li>
      </ul>
      {button === "search" ? (
        <ul className="tracking-selector">
          <li>
            <button
              onClick={() => setSelector("consignment")}
              className={selector === "consignment" ? "chosen" : ""}
            >
              <img src={icon1} className="icon" />
              Track consignment
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelector("fee")}
              className={selector === "fee" ? "chosen" : ""}
            >
              <img src={icon2} className="icon" />
              Freight rate lookup
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelector("q&a")}
              className={selector === "q&a" ? "chosen" : ""}
            >
              <img src={icon3} className="icon" />
              Q&A
            </button>
          </li>
        </ul>
      ) : (
        <div className="services-content">
          <p>This is services</p>
        </div>
      )}
    </div>
  );
};

export default Body;
