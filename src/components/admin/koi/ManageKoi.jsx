import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Fab,
} from "@mui/material";
import api from "../../../api/CallAPI";
import AddIcon from "@mui/icons-material/Add";
import CreateKoi from "./CreateKoi";
import EditKoi from "./EditKoi";
import AdminSideMenu from "../components/AdminSideMenu";

export default function ManageKoi() {
  const [kois, setKois] = useState([]);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isCreateOrEditModalOpen, setIsCreateOrEditModalOpen] = useState(false);
  const [selectedKoiId, setSelectedKoiId] = useState(null);

  // Hàm tải lại danh sách Koi
  const fetchKois = async () => {
    try {
      const data = await api.get("Kois/");
      if (data.success) {
        setKois(data.kois);
      } else {
        console.log("No Koi found!");
      }
    } catch (error) {
      alert("An error has occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchKois();
  }, []);

  // Open confirm delete dialog
  const openConfirmDeleteModal = (koiId) => {
    setSelectedKoiId(koiId);
    setIsConfirmDeleteOpen(true);
  };

  // Close confirm delete dialog
  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
    setSelectedKoiId(null);
  };

  // Confirm delete Koi
  const confirmDeleteKoi = async () => {
    try {
      const data = await api.del("Kois/" + selectedKoiId);
      if (data.success) {
        alert("Deleted successfully!");
        setKois((prevKois) =>
          prevKois.filter((koi) => koi.koiId !== selectedKoiId)
        );
      } else {
        alert("Deletion failed!");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
    closeConfirmDeleteModal();
  };

  // Open modal for adding or editing koi
  const openCreateOrEditModal = (koi = null) => {
    setSelectedKoiId(koi);
    setIsCreateOrEditModalOpen(true);
  };

  // Close modal
  const closeCreateOrEditModal = () => {
    setIsCreateOrEditModalOpen(false);
    setSelectedKoiId(null);
  };

  return (
    <Box display="flex">
      <AdminSideMenu />
      <Box flex={1} padding={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Manage Koi
        </Typography>
        {/* <button onClick={openCreateModal} className="add-koi-btn">
          Add Koi
        </button> */}
        <TableContainer component={Paper}>
          <Table aria-label="koi table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    KoiId
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Type
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Price
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Weight
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kois.map((koi) => (
                <TableRow key={koi.koiId}>
                  <TableCell align="center">{koi.koiId}</TableCell>
                  <TableCell align="center">{koi.koiName}</TableCell>
                  <TableCell align="center">{koi.koiTypeName}</TableCell>
                  <TableCell align="center">{koi.price}</TableCell>
                  <TableCell align="center">{koi.weight}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => openConfirmDeleteModal(koi.koiId)}
                      sx={{ marginRight: 1 }}
                    >
                      Delete
                    </Button>
                    <Button variant="contained" color="primary">
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Floating Action Button for Adding Koi */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => openCreateOrEditModal()}
        >
          <AddIcon />
        </Fab>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isConfirmDeleteOpen}
          onClose={closeConfirmDeleteModal}
          maxWidth="xs" // Ensures the dialog is a small size, but responsive
          fullWidth // Fills the set max width, effectively making it 400px
          PaperProps={{
            sx: {
              width: 400, // Set fixed width
              p: 2, // Add padding around the content
              textAlign: "center",
              borderRadius: 2, // Rounded corners for the dialog
            },
          }}
        >
          <DialogTitle id="confirm-delete-dialog-title">
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-delete-dialog-description">
              Are you sure you want to delete this koi? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={confirmDeleteKoi}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={closeConfirmDeleteModal}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add/Edit Koi Modal */}
        <Dialog
          open={isCreateOrEditModalOpen}
          onClose={closeCreateOrEditModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {selectedKoiId ? "Edit Koi" : "Add New Koi"}
          </DialogTitle>
          <DialogContent>
            <CreateKoi
              koiData={selectedKoiId}
              onClose={closeCreateOrEditModal}
              onAddOrEditSuccess={() => {
                fetchKois(); // Refresh the koi list after adding or editing
                closeCreateOrEditModal();
              }}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
