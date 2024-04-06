import React, { useState, useContext, useEffect } from "react";
import api from "../../api/geoAPI";
import { AppContext } from "../main/AppContext";
import CenteredBox from "./CenteredBox";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";

import MapComponent from "./MapComponent";

function CommuneDetails() {
  const theme = useTheme();
  const { selectedCommune, setSelectedCommune } = useContext(AppContext);
  const navigate = useNavigate();
  const { communeName } = useParams();

  const [loading, setLoading] = useState(true);
  const [fetchCommunesError, setFetchCommunesError] = useState(false);

  const fetchCommunes = async () => {
    try {
      const response = await api.get(
        `communes?nom=${communeName}&fields=code,nom,codesPostaux,population,surface,departement,region,centre,siren`
      );
      if (response && response.data) {
        const matchedCommune = response.data.find(
          (commune) => commune.nom === communeName
        );
        setLoading(false);

        if (matchedCommune !== undefined) {
          setSelectedCommune(matchedCommune);
        } else {
          navigate("/404");
        }
      }
    } catch (err) {
      setLoading(false);
      setFetchCommunesError(true);
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (!selectedCommune) {
      fetchCommunes();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Box>
      {loading ? (
        <CenteredBox id="spinner" height="20vh">
          <CircularProgress />
        </CenteredBox>
      ) : selectedCommune ? (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {selectedCommune.nom}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  mb: 2,
                  display: {
                    md: "flex",
                    gap: 1,
                    alignItems: "center",
                    xs: "block",
                  },
                }}
              >
                <Typography variant="h6">Département :</Typography>
                <Typography sx={{ fontSize: 18, ml: { md: 1 } }}>
                  {`${selectedCommune.departement.nom} (${selectedCommune.departement.code})`}
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: {
                    md: "flex",
                    gap: 1,
                    alignItems: "center",
                    xs: "block",
                  },
                }}
              >
                <Typography variant="h6">Région :</Typography>
                <Typography sx={{ fontSize: 18, ml: { md: 1 } }}>
                  {selectedCommune.region.nom}
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: {
                    md: "flex",
                    gap: 1,
                    alignItems: "center",
                    xs: "block",
                  },
                }}
              >
                <Typography variant="h6">Population :</Typography>
                <Typography sx={{ fontSize: 18, ml: { md: 1 } }}>
                  {"population" in selectedCommune
                    ? selectedCommune.population.toLocaleString("fr-FR")
                    : "(Non fournie par la source!)"}
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: {
                    md: "flex",
                    gap: 1,
                    alignItems: "center",
                    xs: "block",
                  },
                }}
              >
                <Typography variant="h6">Surface :</Typography>
                <Typography sx={{ fontSize: 18, ml: { md: 1 } }}>
                  {Number(
                    (selectedCommune.surface / 100).toFixed(2)
                  ).toLocaleString("fr-FR")}
                  {" km²"}
                </Typography>
              </Box>
              <Box sx={{ mb: 2, display: "flex", gap: "1px" }}>
                <Typography variant="h6" sx={{ pt: 1 }}>
                  {selectedCommune.codesPostaux.length > 1
                    ? "Codes Postaux :"
                    : "Code Postal :"}
                </Typography>
                <List sx={{ pl: 2 }}>
                  {selectedCommune.codesPostaux.map((codePostal, index) => (
                    <ListItem disablePadding key={index}>
                      <ListItemText>
                        <Typography variant="body1">{codePostal}</Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={6}>
                <Box sx={{ opacity: theme.palette.mode === "dark" ? 0.7 : 1 }}>
                  <MapComponent
                    height={250}
                    zoom={11}
                    center={[
                      selectedCommune.centre.coordinates[1],
                      selectedCommune.centre.coordinates[0],
                    ]}
                    markerPosition={[
                      selectedCommune.centre.coordinates[1],
                      selectedCommune.centre.coordinates[0],
                    ]}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : fetchCommunesError ? (
        <Alert severity="error">
          Erreur: Impossible de charger les données du serveur. Rechargez la
          page ou réessayez plus tard.
        </Alert>
      ) : null}
    </Box>
  );
}

export default CommuneDetails;
