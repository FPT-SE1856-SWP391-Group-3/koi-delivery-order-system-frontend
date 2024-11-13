import React from "react"
import "./user/css/CustomerSupport.css"
import Navbar from "./user/common/Navbar"
import Footer from "./user/common/Footer"

const CustomerSupport = () => {
    return (
        <>
            <Navbar />
            <div className="customersupport-container">
                <h2>Client information support:</h2>
                <h1>Information about multi-channel customer support</h1>
                <h3>KOI DELIVERY CUSTOMER CARE CHANNELS</h3>
                <p>
                    With the desire to diversify information access channels for
                    customers as well as respond to the fastest consultation and
                    answer customer questions. During the process of using
                    products and services, you can send Requests/Feedback about
                    products and services provided by KOI DELIVERY through the
                    following channels. All your Requests/Feedback will be
                    recorded and forwarded to the relevant departments for
                    checking and processing. Update the channels you can contact
                    for support immediately. fastest way:
                </p>
                <ul>
                    <li>KOI DELIVERY Customer Support Group</li>
                    <li>Hotline +84-633-649-266 </li>
                    <li>Website </li>
                    <li>KOI DELIVERY Fanpage</li>
                    <li>Email koidelivery@koi.com</li>
                </ul>
                <p>
                    KOI DELIVERY staff are always dedicated and understanding of
                    customers, if you need any support, please use the above
                    tools to get the fastest service! (There will be attached
                    images in coordination with MKT will be sent later)
                </p>
            </div>
            <Footer />
        </>
    )
}

export default CustomerSupport
