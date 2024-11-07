import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Fab,
  Modal,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import AdminSideMenu from "../components/AdminSideMenu";
import api from "../../../api/CallAPI"; // Adjust the path to your actual API file location

const vietnamCities = [
  "Hanoi",
  "Ho Chi Minh City",
  "Da Nang",
  "Hai Phong",
  "Can Tho",
  // Add more cities as needed
];

const CreateRoute = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [routeModalOpen, setRouteModalOpen] = useState(false);

  // Fields for creating a new route
  const [deliveryStaffId, setDeliveryStaffId] = useState("");
  const [cities, setCities] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [estimatedStartTime, setEstimatedStartTime] = useState(dayjs());
  const [estimatedEndTime, setEstimatedEndTime] = useState(dayjs());

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await api.get("RoutesControllers");
      if (response.success && Array.isArray(response.routes)) {
        setRoutes(response.routes);
      } else {
        console.error(
          "Error fetching routes or invalid data format:",
          response
        );
        setError("Error loading routes. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
      setError("An error occurred while fetching routes.");
    }
  };

  const handleAddRouteClick = () => {
    setRouteModalOpen(true);
  };

  const handleRouteSubmit = async () => {
    const newRoute = {
      deliveryStaffId: parseInt(deliveryStaffId),
      cities,
      currentLocation,
      estimatedStartTime: estimatedStartTime.toISOString(),
      estimatedEndTime: estimatedEndTime.toISOString(),
      capacity: parseInt(capacity),
    };

    try {
      const response = await api.post(
        "RoutesControllers/createRoute",
        newRoute
      );
      if (response.success) {
        setRouteModalOpen(false);
        fetchRoutes(); // Refresh the routes list
      } else {
        console.error("Failed to create route:", response);
      }
    } catch (error) {
      console.error("Error creating route:", error);
    }
  };

  return (
    <Box display="flex">
      <AdminSideMenu />
      <Box flex={1} padding={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Manage Routes
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="routes table">
              <TableHead>
                <TableRow>
                  <TableCell>Route ID</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>Current Load</TableCell>
                  <TableCell>Current Location</TableCell>
                  <TableCell>Estimated Start Time</TableCell>
                  <TableCell>Estimated End Time</TableCell>
                  <TableCell>Delivery Staff ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {routes.length > 0 ? (
                  routes.map((route) => (
                    <TableRow key={route.routeId}>
                      <TableCell>{route.routeId}</TableCell>
                      <TableCell>{route.capacity}</TableCell>
                      <TableCell>{route.currentLoad}</TableCell>
                      <TableCell>{route.currentLocation}</TableCell>
                      <TableCell>{route.estimatedStartTime}</TableCell>
                      <TableCell>{route.estimatedEndTime}</TableCell>
                      <TableCell>{route.deliveryStaffId}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No routes available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Floating Action Button for Adding Route */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleAddRouteClick}
        >
          <AddIcon />
        </Fab>

        {/* Modal for Adding New Route */}
        <Modal
          open={routeModalOpen}
          onClose={() => setRouteModalOpen(false)}
          aria-labelledby="add-route-modal-title"
          aria-describedby="add-route-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" id="add-route-modal-title" gutterBottom>
              Add New Route
            </Typography>

            <TextField
              label="Delivery Staff ID"
              fullWidth
              margin="normal"
              value={deliveryStaffId}
              onChange={(e) => setDeliveryStaffId(e.target.value)}
              type="number"
            />

            <Autocomplete
              multiple
              freeSolo
              options={vietnamCities}
              value={cities}
              onChange={(event, newValue) => setCities(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Cities" margin="normal" />
              )}
            />

            <TextField
              label="Current Location"
              fullWidth
              margin="normal"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
            />

            <TextField
              label="Capacity"
              fullWidth
              margin="normal"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Estimated Start Time"
                value={estimatedStartTime}
                onChange={setEstimatedStartTime}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
              <DateTimePicker
                label="Estimated End Time"
                value={estimatedEndTime}
                onChange={setEstimatedEndTime}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </LocalizationProvider>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleRouteSubmit}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default CreateRoute;
