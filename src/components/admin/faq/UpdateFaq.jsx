import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import api from "../../../api/CallAPI";
import UserToast from "../../user/alert/UserToast";
import { ToastContainer } from "react-toastify";


export default function UpdateFaq({ faqId, onClose, onUpdateSuccess }) {
  const [updateFaq, setUpdateFaq] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    // Fetch FAQ information based on faqId
    const fetchFaq = async () => {
      try {
        const data = await api.get(`Faqs/${faqId}`);
        if (data.success) {
          setUpdateFaq(data.faq);
        } else {
          UserToast("error", "FAQ not found.");
        }
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        UserToast("error", "An error occurred while fetching the FAQ.");
      }
    };

    if (faqId) fetchFaq();
  }, [faqId]);

  // Update FAQ handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.put(`Faqs/${faqId}`, updateFaq);
      if (data.success) {
        UserToast("success", "FAQ updated successfully!");
        onUpdateSuccess(); // Callback to refresh FAQ list
        onClose(); // Close modal on successful update
      } else {
        UserToast("error", "Failed to update FAQ!");
      }
    } catch (error) {
      console.error("Error during update:", error);
      UserToast("error", "An error occurred during update. Please try again.");
    }
  };

  return (
    <Box className="updatefaq-container" padding={3} component="form" onSubmit={handleSubmit}>
      <ToastContainer />
      <Typography variant="h5" className="form-title" gutterBottom>
        Update FAQ
      </Typography>

      <TextField
        label="Question"
        variant="outlined"
        fullWidth
        margin="normal"
        value={updateFaq.question}
        onChange={(e) => setUpdateFaq({ ...updateFaq, question: e.target.value })}
      />

      <TextField
        label="Answer"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={updateFaq.answer}
        onChange={(e) => setUpdateFaq({ ...updateFaq, answer: e.target.value })}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="btn-update"
        sx={{ marginTop: 2 }}
      >
        Update
      </Button>
    </Box>
  );
}
