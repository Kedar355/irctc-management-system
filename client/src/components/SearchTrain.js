// SearchTrains.js
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

function SearchTrains() {
  const [searchForm, setSearchForm] = React.useState({
    source: "",
    destination: "",
  });
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState("");
  const [trains, setTrains] = React.useState([]);

  const handleChange = (e) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSearchMessage("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    setSearchMessage("");

    try {
      const response = await fetch(
        `http://localhost:3000/user/availability?source=${searchForm.source}&destination=${searchForm.destination}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error while searching trains");
      }

      const data = await response.json();
      setTrains(data.trains || []);
      setSearchMessage(
        `Found ${data.trains ? data.trains.length : 0} train(s).`
      );
    } catch (error) {
      console.error("Search error:", error);
      setSearchMessage("Failed to search trains. Please try again.");
    } finally {
      setSearchLoading(false);
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
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        Search Trains
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Source"
          name="source"
          value={searchForm.source}
          onChange={handleChange}
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Destination"
          name="destination"
          value={searchForm.destination}
          onChange={handleChange}
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={searchLoading}
          sx={{ position: "relative" }}
        >
          {searchLoading ? (
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
            "Search"
          )}
        </Button>
      </Box>

      {searchMessage && (
        <Fade in={Boolean(searchMessage)}>
          <Alert severity="info" sx={{ mt: 2, width: "100%" }}>
            {searchMessage}
          </Alert>
        </Fade>
      )}

      {/* Display trains if found */}
      {trains.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Search Results:
          </Typography>
          {trains.map((train, index) => (
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
                <strong>Train Number:</strong> {train.trainNumber}
              </Typography>
              <Typography>
                <strong>Available Seats:</strong> {train.availableSeats}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default SearchTrains;
