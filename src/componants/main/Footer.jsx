import React from "react";
// MUI
import { Typography, BottomNavigation } from "@mui/material";

function Footer() {
  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "static",
        bottom: "0",
        backgroundColor: "#1976d2",
        color: "#fff",
      }}
    >
      <Typography variant="h6" sx={{ p: 3 }}>
        Footer
      </Typography>
      ;
    </BottomNavigation>
  );
}

export default Footer;
