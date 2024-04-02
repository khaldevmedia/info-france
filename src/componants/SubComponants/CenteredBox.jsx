import React from "react";
import { Box } from "@mui/material";

function CenteredBox({ children, height }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: height, // La heuteur dans laquelle le contenu centré est placé
      }}
    >
      {children}
    </Box>
  );
}

export default CenteredBox;
