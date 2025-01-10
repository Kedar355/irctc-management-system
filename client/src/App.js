import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  Paper,
  Typography,
  Box,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import UserLogin from "./components/UserLogin";
import RegisterUser from "./components/RegisterUser";
import Navbar from "./components/Navbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = React.useState("login");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderContent = () => {
    switch (currentPage) {
      case "user":
        return <UserLogin />;
      case "register":
        return <RegisterUser />;
      default:
        return <UserLogin />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 2 },
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              align="center"
              color="primary"
              sx={{
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 80,
                  height: 4,
                  backgroundColor: "primary.main",
                  borderRadius: 2,
                },
              }}
            >
              IRCTC Management System
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isMobile={isMobile}
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                mt: 2,
                transition: "all 0.3s ease-in-out",
              }}
            >
              {renderContent()}
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
