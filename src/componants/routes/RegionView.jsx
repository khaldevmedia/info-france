import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/geoAPI";
import CalcRegionPop from "../SubComponants/CalcRegionPop";
import BreadcrumbsHeader from "../SubComponants/BreadcrumbsHeader";
import CenteredBox from "../SubComponants/CenteredBox";
import {
  Box,
  Alert,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { AppContext } from "../main/AppContext";

function RegionsView() {
  const navigate = useNavigate();
  const { regionName } = useParams();

  const {
    regionsList,
    setRegionsList,
    selectedDepartement,
    setSelectedDepartement,
  } = useContext(AppContext);

  const [fetchRegError, setFetchRegError] = useState(false);
  const [fetchDepsError, setFetchDepsError] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [regDepartementsList, setRegDepartementsList] = useState([]);
  const [search, setSearch] = useState("");
  const isRegion = regionsList.some((element) => element.nom === regionName);

  const filterDepartements = () => {
    const fileredList = regDepartementsList.filter((departement) =>
      // Ignorer les letters avec accents pour faciliter la recherche :
      // normalize("NFD") -> transforme 'ô' en 'o'
      // replace(/[\u0300-\u036f]/g, "") -> trasforme 'é' en 'e'
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

  const fetchAllRegions = async () => {
    try {
      const response = await api.get("regions");
      if (response && response.data) {
        setRegionsList(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setFetchRegError(true);
      setLoading(false);
    }
  };

  const fetchRegDepartements = async () => {
    if (regCode) {
      try {
        const response = await api.get(`regions/${regCode}/departements`);
        if (response && response.data) {
          setRegDepartementsList(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
        setFetchDepsError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (regionsList.length > 1 && isRegion) {
      setLoading(false);
    } else {
      fetchAllRegions();
    }
    const filterDep = regionsList.filter((dep) => dep.nom === regionName);

    if (filterDep.length > 0) {
      setRegCode(filterDep[0].code);
    }
  }, [regionsList, regDepartementsList]);

  useEffect(() => {
    if (regionsList.length > 1 && !isRegion) {
      navigate("/404");
    }
  }, [regionsList, navigate]);

  useEffect(() => {
    fetchRegDepartements();
  }, [regCode]);

  return (
    <Box id="main" sx={{ height: "100%", px: { md: 3, xs: 2 }, mb: 2 }}>
      {loading ? (
        <CenteredBox id="spinner" height="20vh">
          <CircularProgress />
        </CenteredBox>
      ) : regionsList.length > 0 ? (
        <Box sx={{ mb: 1 }}>
          <BreadcrumbsHeader />
          <Typography sx={{ mb: 2 }} variant="h4">
            Région: {regionName}
          </Typography>
          <Typography sx={{ mb: 2 }} variant="h6">
            Population: <CalcRegionPop regCode={regCode} />
          </Typography>
          <Typography sx={{ mb: 2 }} variant="h6">
            Nombre des départements :{" "}
            {regDepartementsList
              ? regDepartementsList.length
              : "(Indéterminée)"}
            .
          </Typography>
          {regDepartementsList.length > 0 ? (
            <Box>
              <TextField
                id="outlined-basic"
                label="Filtrer les départements de la région"
                variant="outlined"
                value={search}
                inputProps={{ type: "search" }}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ mb: 2, width: { md: "50%", xs: "100%" } }}
              />
              {regDepartementsList &&
                filterDepartements().map((departement, index) => (
                  <Box key={index}>
                    <Button
                      sx={{
                        mb: 1,
                        width: { md: "50%", xs: "100%" },
                        textAlign: "center",
                      }}
                      color="success"
                      variant="outlined"
                      size="meduim"
                      onClick={() => {
                        setSelectedDepartement(departement);
                        navigate(departement.nom);
                      }}
                    >
                      {departement.nom}
                    </Button>
                  </Box>
                ))}
            </Box>
          ) : fetchDepsError ? (
            <Alert severity="error">
              Erreur: Impossible de charger les données du département du
              serveur. Rechargez la page ou réessayez plus tard.
            </Alert>
          ) : null}
        </Box>
      ) : fetchRegError ? (
        <Alert severity="error">
          Erreur: Impossible de charger les données des départements du serveur.
          Rechargez la page ou réessayez plus tard.
        </Alert>
      ) : null}
    </Box>
  );
}

export default RegionsView;
