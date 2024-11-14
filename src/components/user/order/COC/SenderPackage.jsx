import React, { useEffect, useState } from "react"
import "../../css/CreateOrder.css"
import api from "../../../../api/CallAPI"
import PropTypes from "prop-types"
import { Grid } from "@mui/joy"
import TextField from "@mui/material/TextField"
import { Button, Divider, Typography } from "@mui/material"

const SenderPackage = ({ onChange, setTotalPrice }) => {
    const [orderServiceDetails, setOrderServiceDetails] = useState([])
    const [itemList, setItemList] = useState([
        { koiName: "", weight: "", price: "", amount: "", koiCondition: "" },
    ])

    useEffect(() => {
        let total = 0
        itemList.map((service) => {
            total += service.price * service.amount
        })
        setTotalPrice(total)
    }, [itemList])

    useEffect(() => {
        api.get("OrderServiceDetails/").then((data) => {
            if (data.success) {
                console.log(data.orderServiceDetails)
                setOrderServiceDetails(data.orderServiceDetails)
            } else {
                console.log("Không có dịch vụ!")
            }
        })
    }, [])

    const handleInputChange = (index, field, value) => {
        const updatedItemList = [...itemList]
        updatedItemList[index][field] = value
        setItemList(updatedItemList)
        onChange(updatedItemList)
    }

    const handleAddItem = () => {
        setItemList([
            ...itemList,
            {
                koiName: "",
                weight: "",
                price: "",
                amount: "",
                koiCondition: "",
            },
        ])
    }

    const handleRemoveItem = (index) => {
        if (itemList.length === 1) return
        const updatedItemList = itemList.filter((_, i) => i !== index)
        setItemList(updatedItemList)
        onChange(updatedItemList)
    }

    return (
        <div>
            <h2>Sender Package</h2>
            <div className="sectionCompo">
                {itemList.map((item, index) => (
                    <div id="item" key={index}>
                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                <Typography level="h6">
                                    Package Type {index + 1}
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder="Enter package type."
                                    value={item.koiName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "koiName",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    placeholder="Weight (gram)"
                                    value={item.weight}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "weight",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    placeholder="Price (đ)"
                                    value={item.price}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "price",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid xs={4}>
                                <TextField
                                    fullWidth
                                    placeholder="Amount"
                                    value={item.amount}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "amount",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder="Enter condition"
                                    value={item.koiCondition}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "koiCondition",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>

                            <Grid xs={12}>
                                <Button
                                    variant="outlined"
                                    color="danger"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider sx={{ m: "1em 0" }} />
                    </div>
                ))}
                <Button variant="contained" onClick={handleAddItem}>
                    Add Package
                </Button>
                <Grid>
                    <h1>Services</h1>
                    {orderServiceDetails.map((orderServiceDetail, idx) => (
                        <>
                            <div key={idx}>
                                <p>
                                    Service price:{" "}
                                    {orderServiceDetail.orderServiceDetailName}{" "}
                                </p>
                                <p>
                                    Freight price:{" "}
                                    {orderServiceDetail.orderServiceDetailPrice}{" "}
                                </p>
                            </div>
                            <Divider sx={{ m: "1em 0" }} />
                        </>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

SenderPackage.propTypes = {
    onChange: PropTypes.func.isRequired,
    stateChange: PropTypes.func.isRequired,
}

export default SenderPackage
