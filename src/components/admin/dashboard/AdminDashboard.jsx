import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdminSideMenu from "../components/AdminSideMenu";
import { DataGrid } from "@mui/x-data-grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../../api/CallAPI";

export default function AdminDashboard() {
  const [ordersData, setOrdersData] = useState([]);
  const [order, setOrder] =useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch orders data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get("Orders/");
        setOrder(data.order);
        console.log("Fetched data:", data);

        // Đảm bảo data là mảng và có dữ liệu để tránh lỗi
        const ordersArray = Array.isArray(data.order) ? data.order : data.order || [];

        // Chuẩn bị dữ liệu cho DataGrid với các trường cần thiết
        const dataWithId = ordersArray.map((order, index) => ({
          id: order.orderId || index,           // Sử dụng orderId hoặc index làm id duy nhất
          customer: order.customerId,            // Gán customerId vào customer để hiển thị
          date: order.orderDate,                 // Sử dụng orderDate làm ngày
          total: order.totalPrice || 0           // Sử dụng totalPrice và mặc định là 0 nếu null
        }));
        setOrdersData(dataWithId);

        // Chuẩn bị dữ liệu cho biểu đồ
        const transformedData = dataWithId.map((order) => ({
          date: order.date,                     // Dữ liệu ngày tháng cho biểu đồ
          total: order.total                    // Tổng giá trị cho biểu đồ
        }));
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchOrders();
  }, []);

  // Định nghĩa các cột cho DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "customer", headerName: "Customer ID", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "total", headerName: "Total", width: 150 },
  ];

  return (
    <>
      <CssBaseline />
      <AdminSideMenu />
      <Box sx={{ marginLeft: "250px", padding: "20px" }}>
        {/* Line Chart Section */}
        <Typography variant="h4" gutterBottom>
          Orders Over Time
        </Typography>
        <Box sx={{ width: "100%", height: 400, marginBottom: 4 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Order History Table Section */}
        <Typography variant="h5" gutterBottom>
          Order History
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={ordersData}
            columns={columns}
            initialState={{
              pagination: {
                pageSize: 5,
              },
            }}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Box>
    </>
  );
}
