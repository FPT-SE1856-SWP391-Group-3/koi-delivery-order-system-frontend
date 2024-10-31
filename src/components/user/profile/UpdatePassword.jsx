import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import { Box,Card, CardContent, Container, TextField, Typography, Button } from "@mui/material";
import { Grid } from "@mui/joy";
import UserSideNav from "../UserSideNav";
export default function UpdatePassword() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [passwordData, setPasswordData] = useState({
    userId: user.userId,
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to update password
      api.put("Users/update-password", passwordData).then((data) => {
        if (data.success) {
          alert("Password updated successfully!");
          navigate("/");
        } else {
          alert("Password update failed!");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error! Please try again.");
    }
  };

  return (
    <UserSideNav>
      <Box sx={{ marginInline: "2em" }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Update Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Old Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </UserSideNav>
  );
}
