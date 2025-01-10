// ViewBookings.js
import React from "react";
import { Box, Typography, Paper, Alert, CircularProgress } from "@mui/material";

function ViewBookings() {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const fetchBookings = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/user/getAllbookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data || []);
    } catch (err) {
      console.error("Bookings fetch error:", err);
      setError("Could not load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Automatically fetch bookings when the component is mounted
    fetchBookings();
  }, []);

  return (
    <Paper
      elevation={1}
      sx={{
        p: 4,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        My Bookings
      </Typography>

      {loading && <CircularProgress sx={{ mb: 2 }} />}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && bookings.length === 0 && (
        <Typography>No bookings found.</Typography>
      )}

      {bookings.map((booking, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Typography>
            <strong>Booking ID:</strong> {booking.booking_id}
          </Typography>
          <Typography>
            <strong>Number of Seats:</strong> {booking.number_of_seats}
          </Typography>
          <Typography>
            <strong>Train Number:</strong> {booking.train_number}
          </Typography>
          <Typography>
            <strong>Source:</strong> {booking.source}
          </Typography>
          <Typography>
            <strong>Destination:</strong> {booking.destination}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}

export default ViewBookings;
