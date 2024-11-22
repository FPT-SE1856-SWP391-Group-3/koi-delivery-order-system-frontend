import { useEffect, useState } from "react"
import "../../css/CreateOrder.css"
import api from "../../../../api/CallAPI"
import PropTypes from "prop-types"
import { Grid } from "@mui/joy"
import TextField from "@mui/material/TextField"
import { Button, Divider, Typography } from "@mui/material"

const SenderPackage = ({
    setSenderPackage,
    setCustomerDocument,
    setTotalPrice,
    setTotalServicePrice,
    resetInput,
    setResetInput,
}) => {
    const [orderServiceDetails, setOrderServiceDetails] = useState([])
    const [itemList, setItemList] = useState([
        { koiName: "", weight: "", price: "", amount: 1, koiCondition: "" },
    ])
    const [document, setDocument] = useState([
        { customerDocumentFile: null, description: "" },
    ])

    useEffect(() => {
        let total = 0
        itemList.map((service) => {
            total += service.price * service.amount
        })
        setTotalPrice(total)
    }, [itemList])

    useEffect(() => {
        let total = 0
        orderServiceDetails.map((service) => {
            total += service.orderServiceDetailPrice
        })
        setTotalServicePrice(total)
    }, [orderServiceDetails])

    useEffect(() => {
        api.get("OrderServiceDetails/").then((data) => {
            if (data.success) {
                console.log(data.orderServiceDetails)
                setOrderServiceDetails(data.orderServiceDetails)
            } else {
                console.log("No order service details found!")
            }
        })
    }, [])

    useEffect(() => {
        if (resetInput) {
            setItemList([
                {
                    koiName: "",
                    weight: "",
                    price: "",
                    amount: 1,
                    koiCondition: "",
                },
            ])
            setDocument([{ customerDocumentFile: null, description: "" }])
            setSenderPackage(itemList)
            setCustomerDocument(document)
            setResetInput(false)
        }
    }, [resetInput])

    const handleInputChange = (index, field, value) => {
        const updatedItemList = [...itemList]
        const updatedDocuments = [...document]
        updatedItemList[index][field] = value
        updatedDocuments[index][field] = value
        setItemList(updatedItemList)
        setDocument(updatedDocuments)
        setSenderPackage(updatedItemList)
        setCustomerDocument(updatedDocuments)
    }

    const handleAddItem = () => {
        setItemList([
            ...itemList,
            {
                koiName: "",
                weight: "",
                price: "",
                amount: "1",
                koiCondition: "",
            },
        ])
        setDocument([
            ...document,
            { customerDocumentFile: null, description: "" },
        ])
    }

    const handleRemoveItem = (index) => {
        if (itemList.length === 1) return
        const updatedDocuments = document.filter((_, i) => i !== index)
        const updatedItemList = itemList.filter((_, i) => i !== index)
        setItemList(updatedItemList)
        setDocument(updatedDocuments)
        setSenderPackage(updatedItemList)
        setCustomerDocument(updatedDocuments)
    }

    return (
        <div>
            <h2>Koi</h2>
            <div className="sectionCompo">
                {itemList.map((item, index) => (
                    <div id="item" key={index}>
                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                <Typography level="h6">
                                    Koi {index + 1}
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    fullWidth
                                    placeholder="Enter Koi Name"
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
                            <Grid xs={6}>
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
                            <Grid xs={6}>
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
                        </Grid>
                        <br />
                        <div>
                            <label>Document {index + 1}</label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "customerDocumentFile",
                                        e.target.files[0]
                                    )
                                }
                            />
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder="Enter description"
                                value={item.description}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <Grid xs={12}>
                            <Button
                                variant="outlined"
                                color="danger"
                                onClick={() => handleRemoveItem(index)}
                            >
                                Delete
                            </Button>
                        </Grid>
                        <Divider sx={{ marginBlock: "1em" }} />
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
    stateChange: PropTypes.func.isRequired,
    setSenderPackage: PropTypes.func.isRequired,
    setCustomerDocument: PropTypes.func.isRequired,
    setTotalPrice: PropTypes.func.isRequired,
    setTotalServicePrice: PropTypes.func.isRequired,
    setResetInput: PropTypes.func.isRequired,
}

export default SenderPackage
