import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../../../components/user/common/Header";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function CreateFeedback({orderId}) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId"));
  // let { orderId } = useParams();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      api.post("CustomerFeedbacks/", data).then((data) => {
        if (data.success) {
          alert("Thêm thành công!");
        } else if (data.success === false) {
          alert("Thêm thất bại!");
        }
      });
    } catch (error) {
      console.error("Error!", error);
      alert("Error!. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4">Thêm Phản hồi mới</Typography>
        </Box>
        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              {...register("customerId")}
              value={userId}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mã đơn hàng"
              type="number"
              value={orderId}
              {...register("orderId")}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Bình luận"
              multiline
              rows={4}
              {...register("comment")}
            />
            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
              >
                Thêm
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
