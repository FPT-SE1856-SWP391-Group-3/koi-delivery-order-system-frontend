import React, { useEffect, useState } from "react";
import "../css/Body.css";
import icon1 from "../../../assets/icon1.png";
import icon2 from "../../../assets/icon2.png";
import icon3 from "../../../assets/icon3.png";
import consignment from "../../../assets/cosignment.png";
import faqIcon from "../../../assets/fag.png";
import orderaccept from "../../../assets/orderaccept.png";
import pickup from "../../../assets/pickup.png";
import healthcheck from "../../../assets/healthcheck.png";
import delivering from "../../../assets/delivering.png";
import done from "../../../assets/done.png";
import BlogCard from "./BlogCard";
import api from "../../../api/CallAPI";
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";

const Body = () => {
  const [button, setButton] = useState("search");
  const [selector, setSelector] = useState("consignment");
  const [orderId, setOrderId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOrderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([
    {
      orderDate: "",
      deliveryDate: "",
      distance: null,
      duration: null,
      totalPrice: null,
      endAddress: {
        addressLine: "",
      },
      orderStatus: {
        orderStatusName: "",
      },
      receiver: null,
      route: null,
      shippingMethod: null,
      startAddress: {
        addressLine: "",
      },
    },
  ]);
  const [isFaqOpen, setFaqOpen] = useState(false);
  const [faq, setFaq] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  useEffect(() => {
    fetchFaq();
  }, []);

  const fetchFaq = async () => {
    try {
      const data = await api.get("Faqs/");
      if (data.success) {
        setFaq(data.faqs);
      } else {
        console.log("No FAQs found.");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching FAQs. Please try again.",
        error
      );
    }
  };

  const fetchOrder = async () => {
    setOrderLoading(true);
    try {
      const data = await api.get(`Orders/orderId/${orderId}`);
      if (data.success) {
        setError(null);
        setOrder(data.order);
        setIsOpen(true);
      } else {
        setError("Order not found!");
      }
    } catch (error) {
      if (error.response.status == 404) {
        setError("Order not found!");
        return;
      }
      setError("An error occurred while fetching orders.");
    } finally {
      setOrderLoading(false);
    }
  };

  const OrderInfo = () => {
    const handleCheck = () => {
      fetchOrder();
    };

    return (
      <>
        <button onClick={handleCheck}>
          {isOrderLoading ? "Checking" : "Check"}
        </button>
        <Box
          sx={{
            backgroundColor: "white",
            marginTop: "1rem",
            padding: "1rem",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            display: isOpen ? "block" : "none",
          }}
        >
          <Typography variant="h6">Order Information</Typography>
          <Box>
            <Typography variant="body1">
              Order Date: {order.orderDate}
            </Typography>
            <Typography variant="body1">
              Delivery Date: {order.deliveryDate}
            </Typography>
            <Typography variant="body1">
              Total Price:{" "}
              {order?.totalPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            <Typography variant="body1">
              Status: {order.orderStatus?.orderStatusName}
            </Typography>
            <Typography variant="body1">
              Start Address: {order.startAddress?.addressLine}
            </Typography>
            <Typography variant="body1">
              End Address: {order.endAddress?.addressLine}
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

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
            <a href="/services">Services</a>
          </button>
        </li>
      </ul>
      {button === "search" ? (
        <>
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
                Questions FAQs
              </button>
            </li>
          </ul>
          {selector === "consignment" && (
            <div className="consignment-content">
              <div className="text-content">
                <h3>Order code</h3>
                {error && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
                <input
                  type="text"
                  placeholder="Ex: 122342, 93863821"
                  pattern="[0-9]*"
                  maxLength="20"
                  value={orderId}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    if (!value || /^\d+$/.test(value)) {
                      setOrderId(value);
                    }
                  }}
                />
                <OrderInfo />
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
                  Answer frequently asked questions/questions from customers at
                  Koi Delivery
                </p>
                <button onClick={() => setFaqOpen(true)}>See Now</button>
              </div>
              <img src={faqIcon} alt="" />
              {isFaqOpen && (
                <Dialog
                  open={isFaqOpen}
                  onClose={() => setFaqOpen(false)}
                  maxWidth="lg"
                  fullWidth
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">FAQ</DialogTitle>
                  <DialogContent>
                    <List>
                      {faq.map((faq, index) => (
                        <ListItem key={index}>
                          <ListItemButton>
                            <ListItemText
                              primary={faq.question}
                              secondary={faq.answer}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setFaqOpen(false)} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="services-content"></div>
      )}
      <BlogCard firstChunk={true} />
      <div className="process-content">
        <ul>
          <li className="process_state">
            <img src={orderaccept} alt="" />
            <h3>Order Acceptance</h3>
            <p>
              Shop logs in and posts orders to the dispatch center via the
              management system.
            </p>
          </li>
          <li className="process_state">
            <img src={pickup} alt="" />
            <h3>Pick up</h3>
            <p>Staff come to the shop address to pick up the goods at home</p>
          </li>
          <li className="process_state">
            <img src={healthcheck} alt="" />
            <h3>Fish health check</h3>
            <p>
              The company receives the fish, checks its health and packs it.
            </p>
          </li>
          <li className="process_state">
            <img src={delivering} alt="" />
            <h3>Delivery</h3>
            <p>
              The company carries out the transportation and care of the fish
              during transportation.
            </p>
          </li>
          <li className="process_state">
            <img src={done} alt="" />
            <h3>Finished</h3>
            <p>
              The company delivers fish and related certificates (origin,
              health, awards, ...) to customers and provides support until the
              fish adapt to the new environment.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Body;
