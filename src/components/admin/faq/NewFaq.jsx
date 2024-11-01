import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import api from "../../../api/CallAPI";
import "../faq/NewFaq.css";

export default function NewFaq({ onClose, onAddSuccess }) {
  const { register, handleSubmit } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await api.post("Faqs/", data);
      if (response.success) {
        alert("FAQ added successfully!");
        onAddSuccess(); // Callback to update the FAQ list in ManageFaq
        onClose(); // Close modal on successful addition
      } else {
        alert("Failed to add FAQ!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <Box className="addfaq-container" padding={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" className="form-title" gutterBottom>
        Add New FAQ
      </Typography>
      
      <TextField
        label="Question"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("question")}
      />

      <TextField
        label="Answer"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        {...register("answer")}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="btn-add"
        sx={{ marginTop: 2 }}
      >
        Add
      </Button>
    </Box>
  );
}
