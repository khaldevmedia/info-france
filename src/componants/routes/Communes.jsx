import React, { useState, useEffect, useContext } from "react";
import api from "../../api/geoAPI";
import { AppContext } from "../main/AppContext";
import CommuneDetails from "../SubComponants/CommuneDetails";
import CommuneCounterChip from "../SubComponants/CommuneCounterChip";

import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  Grid,
} from "@mui/material";
import BreadcrumbsHeader from "../SubComponants/BreadcrumbsHeader";

function Communes() {
  const [communes, setCommunes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { selectedCommune, setSelectedCommune } = useContext(AppContext);

  useEffect(() => {
    setCommunes([]); // Effacer l'état des communes
    let timeoutId;
    if (inputValue) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await api.get(
            `communes?nom=${inputValue}&fields=code,nom,codesPostaux,population,surface,departement,region,centre,siren`
          );
          if (response && response.data) {
            setIsLoading(false);
            setCommunes(response.data);
          }
        } catch (err) {
          setIsLoading(false);
          console.log(`Error: ${err.message}`);
        }
      };
      timeoutId = setTimeout(fetchData, 400);
    } else {
      setCommunes([]);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <Box id="main" sx={{ height: "100%", px: { xs: 1, md: 3 }, mb: 3 }}>
      <BreadcrumbsHeader />
      <Box sx={{ mb: 1 }}>
        <Typography sx={{ mb: 2 }} variant="h4">
          Les communes françaises
        </Typography>
        <Typography sx={{ mb: 2 }} variant="h6">
          Il y a plus de 35 milles communes en France.
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: { md: 600 },
            mb: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Grid container spacing={{ md: 2, xs: 0 }}>
            <Grid item xs={9}>
              <Autocomplete
                id="commune-combo-box"
                sx={{ width: "100%" }}
                options={communes}
                getOptionLabel={(option) => option.nom}
                getOptionKey={(option) => option.siren}
                isOptionEqualToValue={(option, value) =>
                  option.siren === value.siren
                }
                renderOption={(props, option) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      borderBottom: 1,
                      borderColor: "grey.300",
                    }}
                    component="li"
                    {...props}
                  >
                    <Box sx={{ width: "60%" }}>
                      <b>{option.nom}</b>
                    </Box>
                    <Box sx={{ width: "40%" }}>
                      {option.departement.code} - {option.departement.nom}
                    </Box>
                  </Box>
                )}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue.trim());
                }}
                onChange={(event, newValue) => {
                  setSelectedCommune(newValue);
                }}
                noOptionsText={
                  inputValue === ""
                    ? "Commancer à tapper pour cherche"
                    : communes.length === 0 && isLoading
                    ? "Recherche en cours..."
                    : communes.length === 0 && !isLoading
                    ? "Acune commune trouvée"
                    : "Acune commune trouvée"
                }
                clearText={"Effacer"}
                openText={"Ouvrir"}
                blurOnSelect={"touch"}
                renderInput={(params) => (
                  <TextField {...params} label="Chercher des communes" />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <CommuneCounterChip
                label={communes.length}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          px: { xs: 1, md: 3 },
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        {selectedCommune && <CommuneDetails />}
      </Box>
    </Box>
  );
}

export default Communes;
