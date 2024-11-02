import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdminSideMenu from "../components/AdminSideMenu";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import api from "../../../api/CallAPI";
import Modal from "react-modal";
import CreateOrderDocument from "./CreateOrderDocument";
import CreateTransportationReportDetails from "../report/CreateTransportationReportDetails";
import "../order/ManageOrder.css";

function OrderRow({
  row,
  orderStatus,
  updateOrderStatusBySelect,
  updateOrderStatusByClick,
  openDocumentModal,
  openReportModal,
  cancelOrder,
}) {
  const [open, setOpen] = useState(false);
  const [koiDetails, setKoiDetails] = useState([]);

  const fetchKoiDetails = async (orderId) => {
    try {
      const data = await api.get(
        `OrderDetails/OrderDetailsByOrderId/${orderId}`
      );
      if (data.success) {
        setKoiDetails(data.koiDetails || []);
      } else {
        console.log("No koi details found!");
      }
    } catch (error) {
      console.error("Error fetching koi details:", error);
    }
  };

  const handleExpandClick = () => {
    setOpen(!open);
    if (!open && koiDetails.length === 0) {
      fetchKoiDetails(row.orderId);
    }
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={handleExpandClick}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.orderId}</TableCell>
        <TableCell>{row.customerId}</TableCell>
        <TableCell>{row.orderDate}</TableCell>
        <TableCell>{row.paymentHistoryId == null ? "False" : "True"}</TableCell>
        <TableCell>{row.deliveryDate}</TableCell>
        <TableCell>{row.orderStatus.orderStatusName}</TableCell>
        <TableCell>
          <select
            onChange={(event) =>
              updateOrderStatusBySelect(event, row.orderId, row.orderStatusId)
            }
            value={row.orderStatusId}
          >
            {orderStatus.map((status) => (
              <option key={status.orderStatusId} value={status.orderStatusId}>
                {status.orderStatusName}
              </option>
            ))}
          </select>
        </TableCell>
        <TableCell>
          <Box display="flex" flexDirection="column" gap={1}>
            <Button
              onClick={() =>
                updateOrderStatusByClick(row.orderId, row.orderStatusId)
              }
            >
              Update Status
            </Button>
            <Button
              onClick={() => openDocumentModal(row.orderId, row.orderStatusId)}
            >
              Order Document
            </Button>
            <Button onClick={() => openReportModal(row.orderId)}>
              Transportation Report
            </Button>
            <Button onClick={() => cancelOrder(row.orderId)} color="error">
              Cancel
            </Button>
          </Box>
        </TableCell>
        <TableCell>{row.deliveryStaffId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="order details">
                <TableHead>
                  <TableRow>
                    <TableCell>Pickup Address</TableCell>
                    <TableCell>Shipping Address</TableCell>
                    <TableCell>Distance</TableCell>
                    <TableCell>Delivery Time</TableCell>
                    <TableCell>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.startAddress?.addressLine || ""}</TableCell>
                    <TableCell>{row.endAddress?.addressLine || ""}</TableCell>
                    <TableCell>{row.distance}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>{row.totalPrice}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Box marginTop={2}>
                <Typography variant="h6" gutterBottom component="div">
                  Koi Details
                </Typography>
                <Table size="small" aria-label="koi details">
                  <TableHead>
                    <TableRow>
                      <TableCell>OrderDetailId</TableCell>
                      <TableCell>Koi Name</TableCell>
                      <TableCell>Weight (kg)</TableCell>
                      <TableCell>Price ($)</TableCell>
                      <TableCell>Koi Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(koiDetails) && koiDetails.length > 0 ? (
                      koiDetails.map((koi) => (
                        <TableRow key={koi.orderDetailId}>
                          <TableCell>{koi.orderDetailId}</TableCell>
                          <TableCell>{koi.koiName}</TableCell>
                          <TableCell>{koi.weight}</TableCell>
                          <TableCell>{koi.price}</TableCell>
                          <TableCell>{koi.koiType}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No Koi Details Available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

OrderRow.propTypes = {
  row: PropTypes.object.isRequired,
  orderStatus: PropTypes.array.isRequired,
  updateOrderStatusBySelect: PropTypes.func.isRequired,
  updateOrderStatusByClick: PropTypes.func.isRequired,
  openDocumentModal: PropTypes.func.isRequired,
  openReportModal: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
};

export default function ManageOrder() {
  const [order, setOrder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatusId, setSelectedOrderStatusId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    fetchOrders();
    fetchOrderStatus();
  }, []);

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const filtered = order.filter((o) => {
        const orderDate = dayjs(o.orderDate);
        return (
          orderDate.isAfter(dayjs(dateRange[0]).subtract(1, "day")) &&
          orderDate.isBefore(dayjs(dateRange[1]).add(1, "day"))
        );
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(order);
    }
  }, [dateRange, order]);

  const fetchOrders = async () => {
    try {
      const endpoint = user.roleId === 4 ? `Orders/${user.userId}` : "Orders/";
      const data = await api.get(endpoint);
      if (data.success) {
        setOrder(data.order);
        setFilteredOrders(data.order);
      } else {
        console.log("No orders found!");
      }
    } catch (error) {
      setAlertMessage("An error occurred while fetching orders.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const fetchOrderStatus = async () => {
    try {
      const data = await api.get("OrderStatus/");
      if (data.success) {
        setOrderStatus(data.orderStatuses);
      } else {
        console.log("Error fetching order statuses.");
      }
    } catch (error) {
      setAlertMessage("An error occurred while fetching order statuses.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const updateOrderStatusBySelect = async (event, orderId, currentStatusId) => {
    const selectedStatusId = parseInt(event.target.value);
    if (selectedStatusId <= currentStatusId) {
      setAlertMessage("Please select the next status only.");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    try {
      await api.put(`Orders/update-status/${orderId}`, {
        updateOrderStatusId: selectedStatusId,
      });
      setOrder((orders) =>
        orders.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatusId: selectedStatusId }
            : order
        )
      );
      setAlertMessage("Order status updated successfully!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      setAlertMessage("An error occurred during status update.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const updateOrderStatusByClick = async (orderId, currentStatusId) => {
    const currentIndex = orderStatus.findIndex(
      (status) => status.orderStatusId === currentStatusId
    );
    if (currentIndex === -1 || currentIndex === orderStatus.length - 1) {
      setAlertMessage("Order is already complete or status not found.");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    const nextStatusId = orderStatus[currentIndex + 1].orderStatusId;
    try {
      const response = await api.put(`Orders/update-status/${orderId}`, {
        updateOrderStatusId: nextStatusId,
      });

      if (response.success) {
        setOrder((orders) =>
          orders.map((order) =>
            order.orderId === orderId
              ? { ...order, orderStatusId: nextStatusId }
              : order
          )
        );
        setAlertMessage("Order status updated successfully!");
        setAlertSeverity("success");
        setAlertOpen(true);
      } else if (!response.success) {
        setAlertMessage("Order status update failed.");
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    } catch (error) {
      setAlertMessage("An error occurred during status update.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const cancelOrder = async (orderId) => {
    const finalStatusId = orderStatus[orderStatus.length - 1]?.orderStatusId;
    if (!finalStatusId) {
      setAlertMessage("Final status not found.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }
    try {
      await api.put(`Orders/update-status/${orderId}`, {
        updateOrderStatusId: finalStatusId,
      });
      setOrder((orders) =>
        orders.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatusId: finalStatusId }
            : order
        )
      );
      setAlertMessage("Order canceled successfully!");
      setAlertSeverity("success");
      setAlertOpen(true);
    } catch (error) {
      setAlertMessage("An error occurred while canceling the order.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const openDocumentModal = (orderId, orderStatusId) => {
    setSelectedOrderId(orderId);
    setSelectedOrderStatusId(orderStatusId);
    setIsDocumentModalOpen(true);
  };

  const closeDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderStatusId(null);
  };

  const openReportModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <Box display="flex">
      {/* Admin Side Menu */}
      
        <AdminSideMenu />
      

      {/* Main Table Area */}
      <Box width="100%" padding={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" gap={2} marginBottom={2}>
            <DatePicker
              label="Start Date"
              value={dateRange[0]}
              onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
            />
            <DatePicker
              label="End Date"
              value={dateRange[1]}
              onChange={(newValue) => setDateRange([dateRange[0], newValue])}
            />
          </Box>
        </LocalizationProvider>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Order ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Is Payment</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Delivering Staff</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredOrders.map((order) => (
                <OrderRow
                  key={order.orderId}
                  row={order}
                  orderStatus={orderStatus}
                  updateOrderStatusBySelect={updateOrderStatusBySelect}
                  updateOrderStatusByClick={updateOrderStatusByClick}
                  openDocumentModal={openDocumentModal}
                  openReportModal={openReportModal}
                  cancelOrder={cancelOrder}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Modal
        isOpen={isDocumentModalOpen}
        onRequestClose={closeDocumentModal}
        style={{
          content: {
            width: "500px",     
            maxHeight: "80vh",
            margin: "auto",
            padding: "15px",
            borderRadius: "8px",
            overflow: "auto",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Button
          onClick={closeDocumentModal}
          variant="contained"
          color="primary"
          sx={{ marginBottom: "10px" }} // Optional: Adds space below the button
        >
          Close
        </Button>

        {selectedOrderId && selectedOrderStatusId && (
          <CreateOrderDocument
            orderId={selectedOrderId}
            orderStatusId={selectedOrderStatusId}
            onClose={closeDocumentModal}
          />
        )}
      </Modal>

      <Modal
        isOpen={isReportModalOpen}
        onRequestClose={closeReportModal}
        style={{
          content: {
            width: "500px",
            maxHeight: "80vh",
            margin: "auto",
            padding: "15px",
            borderRadius: "8px",
            overflow: "auto",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Button
          onClick={closeReportModal}
          variant="contained"
          color="primary"
          sx={{ marginBottom: "10px" }} // Add spacing below the button
        >
          Close
        </Button>

        {selectedOrderId && (
          <CreateTransportationReportDetails
            orderId={selectedOrderId}
            onClose={closeReportModal}
          />
        )}
      </Modal>
    </Box>
  );
}
