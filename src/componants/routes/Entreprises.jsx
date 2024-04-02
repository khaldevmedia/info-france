import React from "react";

import { Box, Typography, Alert } from "@mui/material";

function Entreprise() {
  return (
    <Box sx={{ height: "100%", ml: { md: 3, xs: 2 } }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Entreprises
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        API des entreprises françaises.
      </Typography>
      <Alert severity="info">
        Cette partie du site est en cours de développement.
      </Alert>
    </Box>
  );
}

export default Entreprise;
