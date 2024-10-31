import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import ComponentPath from "routes/ComponentPath";
import Bootstrap from "../props/Bootstrap";
import UserSidebar from "../common/UserSidebar";
import EditAddress from "./EditAddress";
import UserSideNav from "../user-mui/UserSideNav";
import AddAddress from "./AddAddress";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";


export default function UserAddress() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const [showModal, setShowModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);


  useEffect(() => {
    try {
      api.get("Addresses/user/" + id).then((data) => {
        if (data.success) {
          setAddresses(data.address);
          console.log(data.address);
        } else {
          console.log("Không có địa chỉ!");
        }
      });
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  }, [id]);

  async function deleteAddress(addressId) {
    try {
      api.del("Addresses/" + addressId).then((data) => {
        if (data.success) {
          alert("Xóa thành công!");
          const newAddresses = addresses.filter(
            (address) => address.addressId !== addressId
          );
          setAddresses(newAddresses);
        } else {
          alert("Xóa thất bại!");
        }
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
  }

  const handleOpenModal = (addressId) => {
    setSelectedAddressId(addressId);
    setShowModal(true);
  };
  
  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <UserSideNav>
        <Box sx={{ p: 3 }}>
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
                  <TableCell>AddressId</TableCell>
                  <TableCell>UserId</TableCell>
                  <TableCell>Address Line</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addresses.map((address) => (
                  <TableRow key={address.addressId}>
                    <TableCell>{address.addressId}</TableCell>
                    <TableCell>{address.userId}</TableCell>
                    <TableCell>{address.addressLine}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleOpenModal(address.addressId)}
                        sx={{ mr: 1 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteAddress(address.addressId)}
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
              <Button onClick={() => setShowAddModal(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </UserSideNav>
    </div>
  );
}
