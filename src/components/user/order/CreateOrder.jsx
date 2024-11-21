import React, { useState, useCallback, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import ReceiverInfo from "./COC/ReceiverInfo"
import SenderInfo from "./COC/SenderInfo"
import "../css/CreateOrder.css"

import api from "../../../api/CallAPI"
import CustomerDocumentInfo from "./COC/SelectPaymentMethod"
import SideMenu from "../SideMenu"
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Tooltip,
    Typography,
} from "@mui/material"
import UserAppBar from "../UserAppNavbar"
import { Grid } from "@mui/joy"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"
import SenderPackage from "./COC/SenderPackage"
import ComponentPath from "../../../routes/ComponentPath"
import SelectPaymentMethod from "./COC/SelectPaymentMethod"

function CreateOrder() {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [senderInfo, setSenderInfo] = useState({})
    const [receiverInfo, setReceiverInfo] = useState({})
    const [senderPackage, setSenderPackage] = useState([{}])
    const [customerDocument, setCustomerDocument] = useState([{}])
    const [selectPaymentMethod, setSelectPaymentMethod] = useState("")

    const [serviceSelectionState, setServiceSelectionState] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalServicePrice, setTotalServicePrice] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const [resetInput, setResetInput] = useState(false)

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

    const validateForm = () => {
        if (!senderInfo.addressLine) {
            UserToast("error", "Please update your address in your profile!")
            return false
        } else if (
            !receiverInfo.fullName ||
            !receiverInfo.phoneNumber ||
            !receiverInfo.receiverPartAddressLine ||
            !receiverInfo.receiverFullAddressLine ||
            !selectPaymentMethod
        ) {
            UserToast("error", "Please fill in all required fields!")
            return false
        }
        if (
            senderPackage.length === 0 ||
            senderPackage[0].koiName === "" ||
            senderPackage[0].weight === "" ||
            senderPackage[0].price === "" ||
            senderPackage[0].amount === "" ||
            senderPackage[0].koiCondition === ""
        ) {
            UserToast("error", "Please add at least one package!")
            return false
        }
        return true
    }

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

        if (!validateForm()) {
            setIsLoading(false)
            return
        }

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

        formData.append("PaymentMethod", selectPaymentMethod)

        api.postForm("Orders", formData)
            .then((data) => {
                if (data.success) {
                    UserToast("success", "Order has been placed")
                    setResetInput(true)
                } else {
                    UserToast("error", "Fail to place order")
                }
                setIsLoading(false)
            })
            .catch((error) => {
                if (error.code == "notrevalidemail") {
                    UserToast("error", "Email is not valid")
                } else {
                    UserToast(
                        "error",
                        "An error occurred during order creation. Please try again."
                    )
                }
                setIsLoading(false)
            })
    }, [
        senderInfo,
        receiverInfo,
        senderPackage,
        customerDocument,
        selectPaymentMethod,
        setIsLoading,
        validateForm,
    ])

    const handleSaveClick = useCallback(() => {
        const formData = {
            senderInfo,
            receiverInfo,
            senderPackage,
            customerDocument,
        }
        localStorage.setItem("orderData", JSON.stringify(formData))
        UserToast("success", "Order information has been saved!")
    }, [senderInfo, receiverInfo, senderPackage, customerDocument])

    const handleResetClick = useCallback(() => {
        localStorage.removeItem("orderData")
        setIsCheckboxChecked(false)
        setResetInput(true)
        UserToast("success", "Order information has been reset!")
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen((prevOpen) => !prevOpen)
    }

    console.log(selectPaymentMethod)

    return (
        <>
            <ToastContainer />
            <Box sx={{ display: "flex" }}>
                <SideMenu />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <UserAppBar />
                    <Box sx={{ p: 2 }}>
                        <Box component="header" sx={{ mb: 2 }}>
                            <ButtonGroup variant="contained">
                                <Button color="primary" href="/CreateOrder">
                                    Create Domestic Order
                                </Button>
                                <Tooltip title="This function is not available yet">
                                    <Button color="secondary">
                                        Create International Order
                                    </Button>
                                </Tooltip>
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
                                            resetInput={resetInput}
                                            setResetInput={setResetInput}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card sx={{ mb: 2 }}>
                                    <CardContent>
                                        <SenderPackage
                                            setSenderPackage={setSenderPackage}
                                            setCustomerDocument={
                                                setCustomerDocument
                                            }
                                            stateChange={
                                                handleServiceSelectionChange
                                            }
                                            setTotalPrice={setTotalPrice}
                                            setTotalServicePrice={
                                                setTotalServicePrice
                                            }
                                            resetInput={resetInput}
                                            setResetInput={setResetInput}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <SelectPaymentMethod
                                            setSelectPaymentMethod={
                                                setSelectPaymentMethod
                                            }
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
                                                Total Service Price:{" "}
                                                {totalServicePrice.toLocaleString(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                )}
                                            </Typography>
                                            <Typography variant="body1">
                                                Total Cost:{" "}
                                                {totalPrice.toLocaleString(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                )}
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
                                                label="I have read and accept the terms and conditions"
                                            />
                                            {isLoading ? (
                                                <ButtonGroup
                                                    variant="contained"
                                                    disabled
                                                >
                                                    <Button
                                                        color="secondary"
                                                        disabled={
                                                            !isCheckboxChecked
                                                        }
                                                        onClick={
                                                            handleSubmitClick
                                                        }
                                                    >
                                                        Submit
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            handleSaveClick
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            handleResetClick
                                                        }
                                                    >
                                                        Reset
                                                    </Button>
                                                </ButtonGroup>
                                            ) : (
                                                <ButtonGroup variant="contained">
                                                    <Button
                                                        color="primary"
                                                        disabled={
                                                            !isCheckboxChecked
                                                        }
                                                        onClick={
                                                            handleSubmitClick
                                                        }
                                                    >
                                                        Submit
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            handleSaveClick
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            handleResetClick
                                                        }
                                                    >
                                                        Reset
                                                    </Button>
                                                </ButtonGroup>
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default CreateOrder
