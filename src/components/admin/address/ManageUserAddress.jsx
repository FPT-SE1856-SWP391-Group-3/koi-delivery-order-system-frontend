import { useEffect, useState } from "react"
import api from "../../../api/CallAPI"
import "../address/ManageUserAddress.css"
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Paper,
} from "@mui/material"
import { ToastContainer } from "react-toastify"
import UserToast from "../../user/alert/UserToast"

export default function ManageUserAddress({ userId }) {
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true) // Loading state

  // Fetch address data when `userId` changes
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await api.get(`Addresses/user/${userId}`);
        if (data.success) {
          setAddresses(data.address);
        } else {
          setAddresses([]);
          alert("No address information found for this user.");
        }
      } catch (error) {
        alert(
          "An error has occurred while fetching addresses. Please try again."
        );
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
    if (userId) fetchAddresses();
  }, [userId]);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : addresses.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="address table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Address ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.map((address) => (
                <TableRow key={address.addressId}>
                  <TableCell>{address.addressId}</TableCell>
                  <TableCell>{address.addressLine}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="text.secondary">No addresses found!</Typography>
      )}
    </Box>
  );
}
