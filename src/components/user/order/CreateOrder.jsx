import React, { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ReceiverInfo from "./COC/ReceiverInfo"
import SenderInfo from "./COC/SenderInfo"
import "../css/CreateOrder.css"

import api from "../../../api/CallAPI"
import CustomerDocumentInfo from "./COC/CustomerDocumentInfo"
import SideMenu from "../SideMenu"
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Typography,
} from "@mui/material"
import UserAppBar from "../UserAppNavbar"
import { Grid } from "@mui/joy"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"
import SenderPackage from "./COC/SenderPackage"
import { LoadingOverlay } from "@achmadk/react-loading-overlay"

function CreateOrder() {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [senderInfo, setSenderInfo] = useState({})
    const [receiverInfo, setReceiverInfo] = useState({})
    const [senderPackage, setSenderPackage] = useState([{}])
    const [customerDocument, setCustomerDocument] = useState([{}])

    const [serviceSelectionState, setServiceSelectionState] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const savedOrderData = JSON.parse(localStorage.getItem("orderData"))
        if (savedOrderData) {
            setSenderInfo(savedOrderData.senderInfo || {})
            setReceiverInfo(savedOrderData.receiverInfo || {})
            setSenderPackage(savedOrderData.serviceSelection || [{}])
            setCustomerDocument(savedOrderData.customerDocument || [{}])
        }
    }, [])

    function handleServiceSelectionChange() {
        setServiceSelectionState(!serviceSelectionState)
    }

    const handleCheckboxChange = useCallback(() => {
        setIsCheckboxChecked((prevChecked) => !prevChecked)
    }, [])

    const username = "đăng khoa"
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`

    const handleSubmitClick = useCallback(() => {
        // const formData = {
        //   senderInfo,
        //   receiverInfo,
        //   serviceSelection,
        //   additionalNotes,
        // };
        // localStorage.setItem("orderData", JSON.stringify(formData));
        // navigate("/ChoosePayment");
        setIsLoading(true)
        const formData = new FormData()

        formData.append("CustomerId", senderInfo.userId || null)
        formData.append("OrderStatusId", 1)
        formData.append("ShippingMethodId", 1)
        formData.append(
            "StartAddress",
            "Bãi cỏ KTX khu B, Phường Đông Hòa, Dĩ An, Tỉnh Bình Dương, Việt Nam"
        )
        formData.append(
            "ReceiverPartAddressLine",
            receiverInfo.receiverPartAddressLine
        )
        formData.append(
            "ReceiverFullAddressLine",
            receiverInfo.receiverFullAddressLine
        )
        formData.append("ReceiverName", receiverInfo.fullName)
        formData.append("ReceiverPhoneNumber", receiverInfo.phoneNumber)
        formData.append("ReceiverEmail", receiverInfo.email)

        senderPackage.map((pack, index) => {
            formData.append(`KoiName[${index}]`, pack.koiName)
            formData.append(`KoiWeight[${index}]`, pack.weight)
            formData.append(`KoiPrice[${index}]`, pack.price)
            formData.append(`Amount[${index}]`, pack.amount)
            formData.append(`KoiCondition[${index}]`, pack.koiCondition)
        })

        customerDocument.map((doc, index) => {
            if (doc.customerDocumentFile) {
                formData.append(
                    `CustomerDocumentFile`,
                    doc.customerDocumentFile
                )
                formData.append(`Description[${index}]`, doc.description)
            }
        })

        api.postForm("Orders", formData).then((data) => {
            if (data.success) {
                UserToast("success", "Đơn hàng đã được tạo!")
            } else {
                UserToast("error", "Đơn hàng tạo thất bại!")
            }
            setIsLoading(false)
        })
    }, [
        senderInfo,
        receiverInfo,
        senderPackage,
        customerDocument,
        setIsLoading,
    ])

    const handleSaveClick = useCallback(() => {
        const formData = {
            senderInfo,
            receiverInfo,
            senderPackage,
            customerDocument,
        }
        localStorage.setItem("orderData", JSON.stringify(formData))
        alert("Thông tin đơn hàng đã được lưu!")
    }, [senderInfo, receiverInfo, senderPackage, customerDocument])

    const handleResetClick = useCallback(() => {
        localStorage.removeItem("orderData")
        setSenderInfo({})
        setReceiverInfo({})
        setSenderPackage({})
        setCustomerDocument({})
        setIsCheckboxChecked(false)
        alert("Form đã được đặt lại!")
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen((prevOpen) => !prevOpen)
    }

    return (
        <LoadingOverlay active={isLoading} spinner text="Creating Order....">
            <Box sx={{ display: "flex" }}>
                <SideMenu />

                <ToastContainer />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <UserAppBar />
                    <Box sx={{ p: 2 }}>
                        <Box component="header" sx={{ mb: 2 }}>
                            <ButtonGroup variant="contained">
                                <Button color="primary" href="/CreateOrder">
                                    Create Domestic Order
                                </Button>
                                <Button
                                    color="secondary"
                                    href="/CreateOrderInter"
                                >
                                    Create International Order
                                </Button>
                            </ButtonGroup>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ mb: 2 }}>
                                    <CardContent>
                                        <SenderInfo onChange={setSenderInfo} />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <ReceiverInfo
                                            onChange={setReceiverInfo}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ mb: 2 }}>
                                    <CardContent>
                                        <SenderPackage
                                            onChange={setSenderPackage}
                                            stateChange={
                                                handleServiceSelectionChange
                                            }
                                            setTotalPrice={setTotalPrice}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <CustomerDocumentInfo
                                            onChange={setCustomerDocument}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Box component="footer" sx={{ mt: 4 }}>
                            <Card>
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} md={8}>
                                            <Typography variant="body1">
                                                Total Freight: 0 đ
                                            </Typography>
                                            <Typography variant="body1">
                                                Total Cost: {totalPrice} đ
                                            </Typography>
                                            <Typography variant="body1">
                                                Estimated Delivery: Same Day
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            isCheckboxChecked
                                                        }
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                }
                                                label="Tôi đã đọc và đồng ý với Điều khoản quy định"
                                            />
                                            <ButtonGroup variant="contained">
                                                <Button
                                                    color="primary"
                                                    disabled={
                                                        !isCheckboxChecked
                                                    }
                                                    onClick={handleSubmitClick}
                                                >
                                                    Submit
                                                </Button>
                                                <Button
                                                    onClick={handleSaveClick}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={handleResetClick}
                                                >
                                                    Reset
                                                </Button>
                                            </ButtonGroup>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LoadingOverlay>
    )
}
export default CreateOrder
