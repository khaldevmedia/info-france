import React from "react";

import { Box, Typography, Alert } from "@mui/material";

function Home() {
  return (
    <Box component="main" sx={{ height: "100%", px: { md: 3, xs: 2 } }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        Accueil
      </Typography>
      <Typography align="justify">
        Bienvenue au site Internet de l'interface non officielle d'une API
        fournie par le gouvernement français. Veuillez utiliser la barre de
        navigation à gauche pour accéder aux différents services.
      </Typography>
      <Alert severity="warning" sx={{ mt: 5 }}>
        Ce site web est conçu à des fins de démonstration et ne doit pas être
        utilisé comme source d'information.
      </Alert>
    </Box>
  );
}

export default Home;
