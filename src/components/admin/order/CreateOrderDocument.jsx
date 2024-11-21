import React from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Box, Button, TextField, Typography } from "@mui/material"
import api from "../../../api/CallAPI"
import "../order/CreateOrderDocument.css"
import UserToast from "../../user/alert/UserToast"
import { ToastContainer } from "react-toastify"
import { set } from "date-fns"

export default function CreateOrderDocument({
    orderId,
    orderStatusId,
    onClose,
    setAlertMessage,
    setAlertSeverity,
    setAlertOpen,
    // onAddSuccess,
}) {
    const { control, register, handleSubmit } = useForm()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "orderDocuments",
    })

    const onSubmit = async (data) => {
        try {
            data.orderDocuments.forEach(async (orderDocument) => {
                const orderData = new FormData()
                orderData.append("orderId", orderId)
                orderData.append("orderStatusId", orderStatusId)
                orderData.append("orderDocumentFile", orderDocument.filePath[0])
                orderData.append("description", orderDocument.description)

                const response = await api.postForm(
                    "OrderDocuments/",
                    orderData
                )
                if (response.success) {
                    console.log("Document uploaded successfully!")
                    setAlertMessage("Document uploaded successfully!")
                    setAlertSeverity("success")
                    setAlertOpen(true)
                } else {
                    console.error("Failed to upload document!")
                    setAlertMessage("Failed to upload document!")
                    setAlertSeverity("error")
                    setAlertOpen(true)
                }
            })
            // onAddSuccess(); // Update list after successful addition
            onClose() // Close modal
        } catch (error) {
            console.error("Error:", error)
            setAlertMessage("An error occurred while uploading document!")
            setAlertSeverity("error")
            setAlertOpen(true)
        }
    }

    return (
        <Box className="adddocument-container" p={3}>
            <Typography
                variant="h5"
                component="h1"
                className="form-title"
                gutterBottom
            >
                Add New Document
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="add-form">
                {fields.map((field, index) => (
                    <>
                        <Box mb={2}>
                            <input
                                id="filePath"
                                name="filePath"
                                type="file"
                                accept="multipart/form-data"
                                {...register(
                                    `orderDocuments.${index}.filePath`
                                )}
                                style={{ display: "block", width: "100%" }}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Description"
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                {...register(
                                    `orderDocuments.${index}.description`
                                )}
                            />
                        </Box>
                        <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Delete
                        </Button>
                    </>
                ))}

                <Button
                    type="button"
                    onClick={() => append({})}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    Add Document
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    ADD
                </Button>
            </form>
        </Box>
    )
}
