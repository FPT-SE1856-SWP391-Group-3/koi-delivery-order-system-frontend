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
import AddIcon from "@mui/icons-material/Add";
import api from "../../../api/CallAPI";
import NewFaq from "./NewFaq";
import UpdateFaq from "./UpdateFaq";
import AdminSideMenu from "../components/AdminSideMenu";

export default function ManageFaq() {
  const [faqs, setFaqs] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState(null);

  // Fetch FAQs from API
  const fetchFaqs = async () => {
    try {
      const data = await api.get("Faqs/");
      if (data.success) {
        setFaqs(data.faqs);
      } else {
        console.log("No FAQs found.");
      }
    } catch (error) {
      alert("An error occurred while fetching FAQs. Please try again.");
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Confirm deletion of FAQ
  const confirmDeleteFaq = async () => {
    try {
      const data = await api.del(`Faqs/${selectedFaqId}`);
      if (data.success) {
        alert("FAQ deleted successfully!");
        setFaqs((prevFaqs) =>
          prevFaqs.filter((faq) => faq.faqid !== selectedFaqId)
        );
      } else {
        alert("Failed to delete FAQ.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred during deletion. Please try again.");
    }
    closeDeleteDialog();
  };

  // Open and close dialog functions
  const openDeleteDialog = (faqId) => {
    setSelectedFaqId(faqId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedFaqId(null);
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const openUpdateDialog = (faqId) => {
    setSelectedFaqId(faqId);
    setIsUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
    setSelectedFaqId(null);
  };

  return (
    <Box display="flex">
      <AdminSideMenu />
      <Box flex={1} padding={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          FAQs Management
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="faq table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    FAQId
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Question
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Answer
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600} align="center">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.faqid}>
                  <TableCell align="center">{faq.faqid}</TableCell>
                  <TableCell align="center">{faq.question}</TableCell>
                  <TableCell align="center">{faq.answer}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => openDeleteDialog(faq.faqid)}
                      sx={{ marginRight: 1 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openUpdateDialog(faq.faqid)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Floating Action Button for Adding FAQ */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={openAddDialog}
        >
          <AddIcon />
        </Fab>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
          <DialogTitle id="delete-dialog-title" align="center">
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description" align="center">
              Are you sure you want to <strong>Delete</strong> this FAQ?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
          >
            <Button
              onClick={confirmDeleteFaq}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
            <Button
              onClick={closeDeleteDialog}
              variant="outlined"
              color="primary"
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add FAQ Dialog */}
        <Dialog
          open={isAddDialogOpen}
          onClose={closeAddDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New FAQ</DialogTitle>
          <DialogContent>
            <NewFaq onClose={closeAddDialog} onAddSuccess={fetchFaqs} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update FAQ Dialog */}
        <Dialog
          open={isUpdateDialogOpen}
          onClose={closeUpdateDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Update FAQ</DialogTitle>
          <DialogContent>
            <UpdateFaq
              faqId={selectedFaqId}
              onClose={closeUpdateDialog}
              onUpdateSuccess={fetchFaqs}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeUpdateDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
