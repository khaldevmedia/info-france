import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/geoAPI";
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

function DepartementView() {
  const navigate = useNavigate();
  const { departementName } = useParams();

  const {
    setSelectedCommune,
    selectedDepartement,
    departementsList,
    setDepartementsList,
  } = useContext(AppContext);

  const [fetchDepError, setFetchDepError] = useState(false);
  const [fetchCommError, setFetchCommError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [depCommunesList, setDepCommunesList] = useState([]);
  const [depCode, setDepCode] = useState("");
  const [search, setSearch] = useState("");
  const isDepartement = departementsList.some(
    (element) => element.nom === departementName
  );

  const totalPopulation = (depCommunesList) => {
    let totalPop = 0;
    depCommunesList.map((commune) => {
      if ("population" in commune) {
        totalPop += commune.population;
      }
    });
    return totalPop.toLocaleString("fr-FR");
  };

  const filterCommunes = () => {
    const fileredList = depCommunesList.filter((commune) =>
      // normalize("NFD") pour trouver 'ô' en tapant 'o'
      // replace(/[\u0300-\u036f]/g, "") pour trouver 'é' en tapant 'e'
      commune.nom
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
      const response = await api.get("departements");
      if (response && response.data) {
        setDepartementsList(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setFetchDepError(true);
      setLoading(false);
    }
  };

  const fetchDepCommunes = async () => {
    if (depCode) {
      try {
        const response = await api.get(
          `departements/${depCode}/communes?fields=code,nom,codesPostaux,population,surface,departement,region,centre,siren`
        );
        if (response && response.data) {
          setDepCommunesList(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
        setFetchCommError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (departementsList.length > 1 && isDepartement) {
      setLoading(false);
    } else {
      fetchAllDepartements();
    }
    if (Object.keys(selectedDepartement).length > 0) {
      setDepCode(selectedDepartement.code);
    } else {
      const filterDep = departementsList.filter(
        (dep) => dep.nom === departementName
      );

      if (filterDep.length > 0) {
        setDepCode(filterDep[0].code);
      }
    }
  }, [departementsList, depCommunesList]);

  useEffect(() => {
    if (departementsList.length > 1 && !isDepartement) {
      navigate("/404");
    }
  }, [departementsList, navigate]);

  useEffect(() => {
    fetchDepCommunes();
  }, [depCode]);

  return (
    <Box id="main" sx={{ height: "100%", px: { xs: 1, md: 3 }, mb: 2 }}>
      {loading ? (
        <CenteredBox id="spinner" height="20vh">
          <CircularProgress />
        </CenteredBox>
      ) : departementsList.length > 0 ? (
        <Box sx={{ mb: 1 }}>
          <BreadcrumbsHeader />
          <Typography sx={{ mb: 2 }} variant="h4">
            Département : {departementName}
          </Typography>
          <Typography sx={{ mb: 2 }} variant="h6">
            Numéro du département :{" "}
            {selectedDepartement ? selectedDepartement.code : null}
          </Typography>
          <Typography sx={{ mb: 2 }} variant="h6">
            Population :{" "}
            {depCommunesList && totalPopulation(depCommunesList) !== "0" ? (
              totalPopulation(depCommunesList) + "."
            ) : (
              <CircularProgress size={15} />
            )}
          </Typography>
          <Typography sx={{ mb: 2 }} variant="h6">
            Nombre des communes :{" "}
            {depCommunesList.length > 1 ? (
              depCommunesList.length + "."
            ) : (
              <CircularProgress size={15} />
            )}
          </Typography>
          {depCommunesList.length > 0 ? (
            <Box>
              <TextField
                id="outlined-basic"
                label="Filtrer les cummunes du département"
                variant="outlined"
                value={search}
                inputProps={{ type: "search" }}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ width: { xs: 290, md: 500 }, mb: 3 }}
              />
              {depCommunesList &&
                filterCommunes().map((commune, index) => (
                  <Box key={index}>
                    <Button
                      onClick={() => {
                        setSelectedCommune(commune);
                        navigate(commune.nom);
                      }}
                    >
                      {commune.nom}
                    </Button>
                  </Box>
                ))}
            </Box>
          ) : fetchCommError ? (
            <Alert severity="error">
              Erreur: Impossible de charger les données des communes du serveur.
              Rechargez la page ou réessayez plus tard.
            </Alert>
          ) : null}
        </Box>
      ) : fetchDepError ? (
        <Alert severity="error">
          Erreur: Impossible de charger les données du département du serveur.
          Rechargez la page ou réessayez plus tard.
        </Alert>
      ) : null}
    </Box>
  );
}

export default DepartementView;
