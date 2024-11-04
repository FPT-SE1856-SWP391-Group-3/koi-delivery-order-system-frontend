import React, { useState, useEffect } from "react"
import api from "../../../api/CallAPI"
import { TextField, Button, Box, Typography, IconButton } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { useForm } from "react-hook-form"

export default function CreatKoi({ koiData, onClose, onAddOrEditSuccess }) {
    const { register, handleSubmit, setValue } = useForm()
    const [certificationId, setCertificationId] = useState(
        koiData?.certificationId || [""]
    )

    useEffect(() => {
        // If we're editing, set form fields to existing koi data
        if (koiData) {
            setValue("koiTypeId", koiData.koiTypeId)
            setValue("koiName", koiData.koiName)
            setValue("weight", koiData.weight)
            setValue("price", koiData.price)
            setCertificationId(koiData.certificationId || [""])
        }
    }, [koiData, setValue])

    const addCertification = () => {
        setCertificationId([...certificationId, ""])
    }

    const deleteCertification = () => {
        const list = [...certificationId]
        list.pop()
        setCertificationId(list)
    }

    const onSubmit = async (data) => {
        const koiPayload = {
            data,
            certificationId,
        }
        try {
            let response
            if (koiData) {
                // Update Koi
                response = await api.put(`Kois/${koiData.koiId}`, koiPayload)
            } else {
                // Create New Koi
                response = await api.post("Kois", koiPayload)
            }
            if (response.success) {
                alert(
                    koiData
                        ? "Koi updated successfully!"
                        : "Koi added successfully!"
                )
                onAddOrEditSuccess() // Refresh list and close modal
            } else {
                alert(koiData ? "Failed to update koi!" : "Failed to add koi!")
            }
        } catch (error) {
            console.error("Error:", error)
            alert("Error! Please try again.")
        }
    }
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                {koiData ? "Edit Koi" : "Add New Koi"}
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Koi Type"
                    fullWidth
                    required
                    {...register("koiTypeId")}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Koi Name"
                    fullWidth
                    required
                    {...register("koiName")}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Weight (kg)"
                    fullWidth
                    required
                    {...register("weight")}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Price"
                    fullWidth
                    required
                    {...register("price")}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ mr: 2 }}>
                    Certifications
                </Typography>
                <IconButton color="primary" onClick={addCertification}>
                    <AddCircleOutlineIcon />
                </IconButton>
                <IconButton color="secondary" onClick={deleteCertification}>
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Box>

            {certificationId.map((cert, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <TextField
                        label={`Certificate ${index + 1}`}
                        fullWidth
                        variant="outlined"
                        value={cert}
                        onChange={(e) => {
                            const newCertifications = [...certificationId]
                            newCertifications[index] = e.target.value
                            setCertificationId(newCertifications)
                        }}
                    />
                </Box>
            ))}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 3,
                }}
            >
                <Button variant="contained" color="primary" type="submit">
                    {koiData ? "Update" : "Add"}
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}
