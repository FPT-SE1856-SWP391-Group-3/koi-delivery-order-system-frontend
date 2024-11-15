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
                    console.log("No order details found!")
                }
            }
        )
    }, [orderId])

    return (
        <>
            {" "}
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Order Details List
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="order details table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Details ID</TableCell>
                            <TableCell>Koi Name</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Type</TableCell>
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
                                    No order details found!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
