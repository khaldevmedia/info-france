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

function AllDepartements() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { setSelectedDepartement, departementsList, setDepartementsList } =
    useContext(AppContext);

  const fetchAllDepartements = async () => {
    try {
      const response = await api.get("departements?fields=non,code,region");
      if (response && response.data) {
        setDepartementsList(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departementsList.length > 1) {
      setLoading(false);
    } else {
      fetchAllDepartements();
    }
  }, []);

  return (
    <Box id="main" sx={{ height: "100%", px: { xs: 1, md: 3 }, mb: 2 }}>
      <BreadcrumbsHeader />
      <Box sx={{ mb: 1 }}>
        <Typography sx={{ mb: 2 }} variant="h4">
          Les départements français
        </Typography>
        <Typography sx={{ mb: 2 }} variant="h6">
          Nombre des départements : {departementsList.length}.
        </Typography>
      </Box>
      <Box>
        {loading ? (
          <CenteredBox id="spinner" height="20vh">
            <CircularProgress />
          </CenteredBox>
        ) : departementsList.length > 0 ? (
          <Box>
            {departementsList.map((departementObj, index) => (
              <Box key={index}>
                <Button
                  onClick={() => {
                    setSelectedDepartement(departementObj);
                    navigate(departementObj.nom);
                  }}
                >
                  {departementObj.nom} {`(${departementObj.code})`}
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <Alert severity="error">
            Erreur: Impossible de charger les données du serveur. Rechargez la
            page ou réessayez plus tard.
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default AllDepartements;
