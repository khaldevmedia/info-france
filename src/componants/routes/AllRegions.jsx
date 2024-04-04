import React, { useState, useEffect, useContext } from "react";
import api from "../../api/geoAPI";
import BreadcrumbsHeader from "../SubComponants/BreadcrumbsHeader";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CenteredBox from "../SubComponants/CenteredBox";

import { AppContext } from "../main/AppContext";

function Regions() {
  const navigate = useNavigate();

  const { regionsList, setRegionsList } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  const fetchAllRegions = async () => {
    try {
      const response = await api.get("regions");
      if (response && response.data) {
        setRegionsList(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRegions();
  }, []);

  return (
    <Box id="main" sx={{ height: "100%", px: { xs: 1, md: 3 }, mb: 2 }}>
      <BreadcrumbsHeader />
      <Box sx={{ mb: 1 }}>
        <Typography sx={{ mb: 2 }} variant="h4">
          Les régions françaises
        </Typography>
        <Typography sx={{ mb: 2 }} variant="h6">
          Nombre des régions: {regionsList.length}.
        </Typography>
      </Box>
      <Box>
        {loading ? (
          <CenteredBox id="spinner" height="20vh">
            <CircularProgress />
          </CenteredBox>
        ) : regionsList.length > 0 ? (
          <Box>
            {regionsList.map((regionObj, index) => (
              <Box key={index}>
                <Button
                  sx={{
                    mb: 1,
                    width: { md: "50%", xs: "100%" },
                    textAlign: "left",
                  }}
                  variant="outlined"
                  size="meduim"
                  onClick={() => navigate(regionObj.nom)}
                >
                  {regionObj.nom}
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <Alert severity="error">
            Erreur: Impossible de charger les données du serveur.
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default Regions;
