import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import EditAddress from "./EditAddress"
import AddAddress from "./AddAddress"
import AdminSideMenu from "../../admin/components/AdminSideMenu"
import SideMenu from "../SideMenu"
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material"
import UserToast from "../alert/UserToast"
import { ToastContainer } from "react-toastify"

export default function UserAddress() {
    const [addresses, setAddresses] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const navigate = useNavigate()

    const id = localStorage.getItem("userId")
    const user = JSON.parse(localStorage.getItem("user"))
    const roleId = user?.roleId

    useEffect(() => {
        try {
            api.get("addresses/user/" + id).then((data) => {
                if (data.success) {
                    setAddresses(data.address)
                    console.log(data.address)
                } else {
                    console.log("Không có địa chỉ!")
                }
            })
        } catch (error) {
            UserToast("error", "An error occurred while fetching addresses.")
        }
    }, [id])

    async function deleteAddress(addressId) {
        try {
            api.del("addresses/" + addressId).then((data) => {
                if (data.success) {
                    UserToast("success", "Address deleted successfully.")
                    const newAddresses = addresses.filter(
                        (address) => address.addressId !== addressId
                    )
                    setAddresses(newAddresses)
                } else {
                    UserToast("error", "An error occurred during deletion.")
                }
            })
        } catch (error) {
            console.error("Error during deletion:", error)
            UserToast("error", "An error occurred during deletion.")
        }
    }

    const handleOpenModal = (addressId) => {
        setSelectedAddressId(addressId)
        setShowModal(true)
    }

    const handleOpenAddModal = () => setShowAddModal(true)
    const handleCloseModal = () => setShowModal(false)

    // Conditionally render the correct sidebar based on roleId
    const renderSidebar = () => {
        if (roleId === 2) return <SideMenu />
        return <AdminSideMenu />
    }

    return (
        <Box sx={{ display: "flex" }}>
            {renderSidebar()}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Address
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setShowAddModal(true)}
                    sx={{ mb: 2 }}
                >
                    Add Address
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Address Line</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addresses.map((address) => (
                                <TableRow key={address.addressId}>
                                    <TableCell>{address.addressLine}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                handleOpenModal(
                                                    address.addressId
                                                )
                                            }
                                            sx={{ mr: 1 }}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() =>
                                                deleteAddress(address.addressId)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Edit Address Modal */}
                <Dialog
                    open={showModal}
                    onClose={handleCloseModal}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>Update Address</DialogTitle>
                    <DialogContent>
                        <EditAddress
                            addressId={selectedAddressId}
                            closeModal={handleCloseModal}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </DialogActions>
                </Dialog>

                {/* Add Address Modal */}
                <Dialog
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>Add New Address</DialogTitle>
                    <DialogContent>
                        <AddAddress closeModal={() => setShowAddModal(false)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowAddModal(false)}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}
