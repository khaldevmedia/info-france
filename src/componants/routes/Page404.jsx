import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

import LocationSearchSVG from "../SubComponants/LocationSearchSVG";

function Page404() {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{
        height: "100%",
        px: { md: 3, xs: 2 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          md: { width: "50%", height: "50%" },
          xs: { width: "60%", height: "60%" },
        }}
      >
        <LocationSearchSVG />
      </Box>
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        Il paraît que vous avez perdu le chemin.
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        La page que vous chercher n'existe pas!
      </Typography>
      <Link href="#" onClick={() => navigate("/")} sx={{ textAlign: "center" }}>
        Retour à la page d'acceuil
      </Link>
    </Box>
  );
}

export default Page404;
