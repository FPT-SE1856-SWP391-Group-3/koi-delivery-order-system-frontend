import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import api from "../../../api/CallAPI";
import Modal from "react-modal";
import CreateOrderDocument from "./CreateOrderDocument";
import CreateTransportationReportDetails from "../report/CreateTransportationReportDetails";

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
      console.log(api.get(`OrderDetails/OrderDetailsByOrderId/${row.orderId}`));
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

export default function ManageRoute() {
  const [order, setOrder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatusId, setSelectedOrderStatusId] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchOrderStatus();
  }, []);

  useEffect(() => {
    // Filter orders with deliveryStaffId as null and orderStatusId as 6
    const filtered = order.filter((o) => o.deliveryStaffId === null);
    setFilteredOrders(filtered);
  }, [order]);

  const fetchOrders = async () => {
    try {
      const data = await api.get(`Orders/${user.userId}`);
      if (data.success) {
        // Filter orders with orderStatusId = 6 and deliveryStaffId as null
        const filtered = data.order.filter(
          (o) => o.orderStatusId === 6 && o.deliveryStaffId === null
        );
        setOrder(data.order); // Set all orders if needed for other purposes
        setFilteredOrders(filtered); // Only set the filtered orders for display
      } else {
        console.log("No orders found!");
      }
    } catch (error) {
      alert("An error occurred while fetching orders.");
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
      alert("An error occurred while fetching order statuses.");
    }
  };

  const updateOrderStatusBySelect = async (event, orderId, currentStatusId) => {
    const selectedStatusId = parseInt(event.target.value);
    if (selectedStatusId <= currentStatusId) {
      alert("Please select the next status only.");
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
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during status update.");
    }
  };

  const updateOrderStatusByClick = async (orderId, currentStatusId) => {
    const currentIndex = orderStatus.findIndex(
      (status) => status.orderStatusId === currentStatusId
    );
    if (currentIndex === -1 || currentIndex === orderStatus.length - 1) {
      alert("Order is already complete or status not found.");
      return;
    }
    const nextStatusId = orderStatus[currentIndex + 1].orderStatusId;
    try {
      await api.put(`Orders/update-status/${orderId}`, {
        updateOrderStatusId: nextStatusId,
      });
      setOrder((orders) =>
        orders.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatusId: nextStatusId }
            : order
        )
      );
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred during status update.");
    }
  };

  const cancelOrder = async (orderId) => {
    const finalStatusId = orderStatus[orderStatus.length - 1]?.orderStatusId;
    if (!finalStatusId) {
      alert("Final status not found.");
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
      alert("Order canceled successfully!");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("An error occurred while canceling the order.");
    }
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
      <Box width="20%" padding={2}>
        <AdminSideMenu />
      </Box>

      {/* Main Table Area */}
      <Box width="80%" padding={2}>
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

      <Modal isOpen={isDocumentModalOpen} onRequestClose={closeDocumentModal}>
        <button onClick={closeDocumentModal}>Close</button>
        {selectedOrderId && selectedOrderStatusId && (
          <CreateOrderDocument
            orderId={selectedOrderId}
            orderStatusId={selectedOrderStatusId}
            onClose={closeDocumentModal}
          />
        )}
      </Modal>

      <Modal isOpen={isReportModalOpen} onRequestClose={closeReportModal}>
        <button onClick={closeReportModal}>Close</button>
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
