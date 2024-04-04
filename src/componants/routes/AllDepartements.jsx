import React, { useState, useEffect, useContext } from "react";
import api from "../../api/geoAPI";
import BreadcrumbsHeader from "../SubComponants/BreadcrumbsHeader";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import CenteredBox from "../SubComponants/CenteredBox";

import { AppContext } from "../main/AppContext";

function AllDepartements() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { setSelectedDepartement, departementsList, setDepartementsList } =
    useContext(AppContext);

  const filterDepartements = () => {
    const fileredList = departementsList.filter((departement) =>
      // normalize("NFD") pour trouver 'ô' en tapant 'o'
      // replace(/[\u0300-\u036f]/g, "") pour trouver 'é' en tapant 'e'
      departement.nom
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(
          search
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        )
    );
    return fileredList;
  };

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
            <TextField
              id="outlined-basic"
              label="Filtrer les départements"
              variant="outlined"
              value={search}
              inputProps={{ type: "search" }}
              onChange={(event) => setSearch(event.target.value)}
              sx={{ mb: 2, width: { md: "50%", xs: "100%" } }}
            />
            {filterDepartements().map((departementObj, index) => (
              <Box key={index}>
                <Button
                  sx={{
                    mb: 1,
                    width: { md: "50%", xs: "100%" },
                    textAlign: "left",
                  }}
                  variant="outlined"
                  size="meduim"
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
