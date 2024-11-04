import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../api/CallAPI"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
} from "@mui/material"

export default function UserOrderDetail({ orderId }) {
    const [UserOrderDetails, setUserOrderDetails] = useState([])

    useEffect(() => {
        api.get("OrderDetails/OrderDetailsByOrderId/" + orderId).then(
            (data) => {
                if (data.success) {
                    setUserOrderDetails(data.orderDetails)
                    console.log(data.orderDetails)
                } else {
                    console.log("Không có chi tiết đơn hàng!")
                }
            }
        )
    }, [orderId])

    return (
        <>
            {" "}
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Danh sách chi tiết đơn hàng
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="order details table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã chi tiết đơn hàng</TableCell>
                            <TableCell>Tên cá koi</TableCell>
                            <TableCell>Trọng lượng</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Loại</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {UserOrderDetails.length > 0 ? (
                            UserOrderDetails.map((UserOrderDetail) => (
                                <TableRow key={UserOrderDetail.orderDetailId}>
                                    <TableCell>
                                        {UserOrderDetail.orderDetailId}
                                    </TableCell>
                                    <TableCell>
                                        {UserOrderDetail.koi.koiName}
                                    </TableCell>
                                    <TableCell>
                                        {UserOrderDetail.koi.weight}
                                    </TableCell>
                                    <TableCell>
                                        {UserOrderDetail.koi.price}
                                    </TableCell>
                                    <TableCell>
                                        {UserOrderDetail.koi.koiType != null
                                            ? UserOrderDetail.koi.koiType
                                                  .koiTypeName
                                            : ""}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
