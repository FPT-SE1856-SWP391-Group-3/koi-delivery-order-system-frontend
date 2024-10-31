import { useState, useEffect } from "react";
import api from "../../../../api/CallAPI";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

export default function OrderCount() {
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        api.get("Orders/" + user.userId).then((response) => {
            console.log(response.orders);
            setOrder(response.orders);
        });
    }, [user]);

    const orderByStatus = (status) => {
        return order.filter((order) => order.orderStatusId === status).length;
    };

    const statuses = [
        { id: 1, label: 'Đang xử lí', color: 'rgb(255, 99, 132)' },
        { id: 2, label: 'Tiếp nhận đơn hàng', color: 'rgb(54, 162, 235)' },
        { id: 3, label: 'Đang xác nhận yêu cầu', color: 'rgb(255, 205, 86)' },
        { id: 4, label: 'Đang lấy hàng, xử lí thủ tục hải quan (Nếu có)', color: 'rgb(75, 192, 192)' },
        { id: 5, label: 'Đã lấy hàng, đang kiểm tra sức khỏe', color: 'rgb(153, 102, 255)' },
        { id: 6, label: 'Đang đóng gói, chuẩn bị giấy chứng nhận', color: 'rgb(255, 159, 64)' },
        { id: 7, label: 'Đã đóng gói, chuẩn bị vận chuyển', color: 'rgb(255, 99, 132)' },
        { id: 8, label: 'Đang vận chuyển', color: 'rgb(54, 162, 235)' },
        { id: 9, label: 'Chuẩn bị bàn giao cá', color: 'rgb(255, 205, 86)' },
        { id: 10, label: 'Xác nhận giao hàng thành công', color: 'rgb(75, 192, 192)' },
        { id: 11, label: 'Xác nhận hủy đơn hàng', color: 'rgb(153, 102, 255)' },
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Số đơn</TableCell>
                        <TableCell>Tiền thu hộ (VND)</TableCell>
                        <TableCell>Tiền cước</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {statuses.map((status) => (
                        <TableRow key={status.id}>
                            <TableCell>
                                <span style={{ color: status.color, fontWeight: 'bold' }}>●</span> {status.label}
                            </TableCell>
                            <TableCell>{orderByStatus(status.id)} đơn hàng</TableCell>
                            <TableCell>0 ₫</TableCell> {/* Dữ liệu Tiền thu hộ */}
                            <TableCell>0 ₫</TableCell> {/* Dữ liệu Tiền cước */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
