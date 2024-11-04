import React, { useState } from "react"
import "../css/Body.css"
import icon1 from "../../../assets/icon1.png"
import icon2 from "../../../assets/icon2.png"
import icon3 from "../../../assets/icon3.png"
import consignment from "../../../assets/cosignment.png"
import faq from "../../../assets/fag.png"
import orderaccept from "../../../assets/orderaccept.png"
import pickup from "../../../assets/pickup.png"
import healthcheck from "../../../assets/healthcheck.png"
import delivering from "../../../assets/delivering.png"
import done from "../../../assets/done.png"
import BlogCard from "./BlogCard"

const Body = () => {
    const [button, setButton] = useState("search")
    const [selector, setSelector] = useState("consignment")
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
                <>
                    <ul className="tracking-selector">
                        <li>
                            <button
                                onClick={() => setSelector("consignment")}
                                className={
                                    selector === "consignment" ? "chosen" : ""
                                }
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
                                Questions FAQs
                            </button>
                        </li>
                    </ul>
                    {selector === "consignment" && (
                        <div className="consignment-content">
                            <div className="text-content">
                                <h3>Order code</h3>
                                <input
                                    type="text"
                                    placeholder="Ex: 122342, 93863821"
                                />
                                <button>Check</button>
                            </div>
                            <img src={consignment} alt="" />
                        </div>
                    )}

                    {selector === "fee" && (
                        <div className="fee-content">
                            <h3>Freight Rate Lookup</h3>
                            <input type="text" placeholder="Enter location" />
                            <button>Lookup</button>
                        </div>
                    )}

                    {selector === "q&a" && (
                        <div className="qna-content">
                            <div className="text-content">
                                <h3>Frequently Asked Questions FAQs</h3>
                                <p>
                                    Answer frequently asked questions/questions
                                    from customers at Koi Delivery
                                </p>
                                <button>See Now</button>
                            </div>
                            <img src={faq} alt="" />
                        </div>
                    )}
                </>
            ) : (
                <div className="services-content">
                    <p>This is services</p>
                </div>
            )}
            <BlogCard />
            <div className="process-content">
                <ul>
                    <li className="process_state">
                        <img src={orderaccept} alt="" />
                        <h3>Order Acceptance</h3>
                        <p>
                            Shop logs in and posts orders to the dispatch center
                            via the management system.
                        </p>
                    </li>
                    <li className="process_state">
                        <img src={pickup} alt="" />
                        <h3>Pick up</h3>
                        <p>
                            Staff come to the shop address to pick up the goods
                            at home
                        </p>
                    </li>
                    <li className="process_state">
                        <img src={healthcheck} alt="" />
                        <h3>Fish health check</h3>
                        <p>
                            The company receives the fish, checks its health and
                            packs it.
                        </p>
                    </li>
                    <li className="process_state">
                        <img src={delivering} alt="" />
                        <h3>Delivery</h3>
                        <p>
                            The company carries out the transportation and care
                            of the fish during transportation.
                        </p>
                    </li>
                    <li className="process_state">
                        <img src={done} alt="" />
                        <h3>Finished</h3>
                        <p>
                            The company delivers fish and related certificates
                            (origin, health, awards, ...) to customers and
                            provides support until the fish adapt to the new
                            environment.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Body
