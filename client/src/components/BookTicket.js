// BookTicket.js
import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Fade,
} from "@mui/material";

function BookTicket() {
  const [formData, setFormData] = React.useState({
    trainId: "",
    seatsToBook: "",
  });
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage("");
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Booking ticket...");
    setStatus(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/user/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          trainId: formData.trainId,
          seatsToBook: formData.seatsToBook,
        }),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const data = await response.json();
      console.log("Booking data:", data);

      setMessage("Ticket booked successfully!");
      setStatus("success");
      setFormData({ trainId: "", seatsToBook: "" });
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("Failed to book ticket. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 4,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        Book Ticket
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Train Number"
          name="trainId"
          type="number"
          value={formData.trainId}
          onChange={handleChange}
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Seats to Book"
          name="seatsToBook"
          type="number"
          value={formData.seatsToBook}
          onChange={handleChange}
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ position: "relative" }}
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                color: "white",
                position: "absolute",
                top: "50%",
                left: "50%",
                mt: "-12px",
                ml: "-12px",
              }}
            />
          ) : (
            "Book Ticket"
          )}
        </Button>
      </Box>

      {message && (
        <Fade in={Boolean(message)}>
          <Alert severity={status || "info"} sx={{ mt: 2, width: "100%" }}>
            {message}
          </Alert>
        </Fade>
      )}
    </Paper>
  );
}

export default BookTicket;
