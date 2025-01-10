import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
  Fade,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchTrains from "./SearchTrain";
import BookTicket from "./BookTicket";
import ViewBookings from "./ViewBookings";

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  width: "100%",
  marginTop: theme.spacing(2),
}));

function UserLogin() {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [status, setStatus] = React.useState(null); // 'success' or 'error'
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // If user has opted for "Remember Me", attempt to fill the form automatically
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setFormData({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setStatus(null);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Logging in...");
    setStatus(null);

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      // Save token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // If "Remember Me" is checked, save credentials; otherwise clear them
      if (rememberMe) {
        localStorage.setItem("savedEmail", formData.email);
        localStorage.setItem("savedPassword", formData.password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }

      setMessage(`Welcome ${data.email || "User"}!`);
      setStatus("success");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("User login error:", error);
      setMessage("Invalid email or password");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMessage("");
    setStatus(null);
  };

  // If user is logged in, show the SearchTrains, BookTicket, and My Bookings
  if (isLoggedIn) {
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            Welcome to Your Dashboard!
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <SearchTrains />
        <BookTicket />
        <ViewBookings />
      </Box>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
        }}
      >
        <PersonOutlineIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          color="primary"
        >
          User Login
        </Typography>
      </Box>

      <StyledForm onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Checkbox checked={rememberMe} onChange={handleRememberMe} />
          }
          label="Remember Me"
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.5,
            position: "relative",
          }}
        >
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                mt: "-12px",
                ml: "-12px",
              }}
            />
          ) : (
            "Login"
          )}
        </Button>
      </StyledForm>

      {message && (
        <Fade in={Boolean(message)}>
          <Alert
            severity={status || "info"}
            sx={{
              mt: 2,
              width: "100%",
              animation: "fadeIn 0.5s ease-in",
            }}
          >
            {message}
          </Alert>
        </Fade>
      )}
    </Paper>
  );
}

export default UserLogin;
