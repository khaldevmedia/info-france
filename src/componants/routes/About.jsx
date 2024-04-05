import React from "react";
import { Box, Typography, Link, Alert } from "@mui/material";

import { useTheme } from "@mui/material/styles";

function About() {
  const theme = useTheme();
  return (
    <Box component="main" sx={{ height: "100%", px: { md: 3, xs: 2 } }}>
      <Typography sx={{ mb: 2 }} variant="h4">
        À propos
      </Typography>
      <Typography align="justify">
        Ce site est une interface non officielle qui consume une API fournie par
        le gouvernement français. Pour consulter le site Internet de l'API,
        veuillez cliquer{" "}
        <Link href="https://api.gouv.fr/" target="_blank" rel="noreferrer">
          ici
          <svg
            class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1yls13q"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ArrowOutwardRoundedIcon"
            height="13"
            width="13"
            fill={theme.palette.primary.main}
          >
            <path d="M6 7c0 .55.45 1 1 1h7.59l-8.88 8.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L16 9.41V17c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1"></path>
          </svg>
        </Link>
        .
      </Typography>
      <Alert severity="warning" sx={{ mt: 5 }}>
        Ce site web est conçu à des fins de démonstration et ne doit pas être
        utilisé comme source d'information.
      </Alert>
    </Box>
  );
}

export default About;
