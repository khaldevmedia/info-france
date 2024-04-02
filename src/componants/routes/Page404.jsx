import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import CenteredBox from "../SubComponants/CenteredBox";

function Page404() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMeduimScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CenteredBox id="main" height={isMeduimScreen ? "50vh" : "70vh"}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {"¯\\_(ツ)_/¯"}
      </Typography>
      <Typography variant={isMeduimScreen ? "h6" : "h4"} sx={{ mb: 3 }}>
        Il paraît que vous avez perdu le chemin.
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        La page que vous chercher n'existe pas!
      </Typography>
      <Link href="#" onClick={() => navigate("/")}>
        Retour à la page d'acceuil
      </Link>
    </CenteredBox>
  );
}

export default Page404;
