import React from "react";
import { Tabs, Tab, Paper, Box, Menu, MenuItem, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function Navbar({ currentPage, setCurrentPage, isMobile }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleClose();
  };

  const menuItems = [
    { label: "Login", value: "user", icon: <PersonIcon /> },
    { label: "Register", value: "register", icon: <HowToRegIcon /> },
  ];

  if (isMobile) {
    return (
      <Box sx={{ width: "100%" }}>
        <Button
          id="nav-menu-button"
          aria-controls={open ? "nav-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          startIcon={<MenuIcon />}
          variant="contained"
          fullWidth
          sx={{ mb: 2 }}
        >
          {menuItems.find((item) => item.value === currentPage)?.label}
        </Button>
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "nav-menu-button",
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.value}
              onClick={() => handlePageChange(item.value)}
              selected={currentPage === item.value}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.icon}
                {item.label}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        borderRadius: 2,
      }}
    >
      <Tabs
        value={currentPage}
        onChange={(_, newValue) => setCurrentPage(newValue)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="navigation tabs"
        sx={{
          "& .MuiTab-root": {
            minHeight: 64,
            textTransform: "none",
            fontSize: "1rem",
          },
        }}
      >
        {menuItems.map((item) => (
          <Tab
            key={item.value}
            value={item.value}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.icon}
                {item.label}
              </Box>
            }
          />
        ))}
      </Tabs>
    </Paper>
  );
}

export default Navbar;
