import React from "react";
import Navbar from "./user/common/Navbar";
import Footer from "./user/common/Footer";
import api from "@api";

const Service = () => {
  const [service, setService] = React.useState([]); 
  const [shippingMethod, setShippingMethod] = React.useState([]);


  React.useEffect(() => {
    api.get("OrderServiceDetails")
      .then((response) => {
        setService(response.orderServiceDetails);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    api
      .get("ShippingMethods")
      .then((response) => {
        setShippingMethod(response.shippingMethods);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  } , []);




  return (
    <div>
      <Navbar />
      <div className="customersupport-container">
        <h2>Client Information Support:</h2>
        <h1>Service Price Table</h1>
        {/* Bảng giá dịch vụ */}
        <table
          border={1}
          cellPadding={10}
          cellSpacing={0}
          style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>Service</th>
              <th>Price (VND)</th>
            </tr>
          </thead>
          <tbody>
            {service.map((item) => (
              <>
                <tr>
                  <td style={{paddingLeft: "0.25em"}}>{item.orderServiceDetailName}</td>
                  <td style={{paddingLeft: "0.25em"}}>{item.orderServiceDetailPrice.toLocaleString("vi-VN", {style:"currency", currency:"VND"})}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <h1>Shipping Price</h1>
        <table
        border={1}
        cellPadding={10}
        cellSpacing={0}
        style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Shipping Method</th>
              <th>Price (VND) / KM</th>
            </tr>
          </thead>
          <tbody>
            {shippingMethod.map((item) => (
              <>
                <tr>
                  <td style={{paddingLeft: "0.25em"}}>{item.shippingMethodName}</td>
                  <td style={{paddingLeft: "0.25em"}}>{item.shippingMethodPrice.toLocaleString("vi-VN", {style:"currency", currency:"VND"})}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <ul style={{ marginTop: 20 }}>
          <li>KOI DELIVERY Customer Support Group</li>
          <li>Hotline +84-633-649-266 </li>
          <li>Website</li>
          <li>KOI DELIVERY Fanpage</li>
          <li>Email koidelivery@koi.com</li>
        </ul>
        <p>
          KOI DELIVERY staff are always dedicated and understanding of
          customers, if you need any support, please use the above tools to get
          the fastest service! (There will be attached images in coordination
          with MKT will be sent later)
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Service;
