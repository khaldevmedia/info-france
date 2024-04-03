import React, { useState, useEffect, useContext } from "react";
import api from "../../api/geoAPI";
import { AppContext } from "../main/AppContext";
import CommuneDetails from "../SubComponants/CommuneDetails";

import { Box, Typography, TextField, Autocomplete, Chip } from "@mui/material";

function Communes() {
  const [communes, setCommunes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { selectedCommune, setSelectedCommune } = useContext(AppContext);

  const [center, setCenter] = useState([45.75, 4.85]); // initial center

  // Une fonction pour modifier `center`
  const updateCenter = (newLatitude, newLongitude) => {
    setCenter([newLatitude, newLongitude]);
  };

  useEffect(() => {
    setCommunes([]); // Effacer l'état des communes
    let timeoutId;
    if (inputValue) {
      const fetchData = async () => {
        try {
          const response = await api.get(
            `communes?nom=${inputValue}&fields=code,nom,codesPostaux,population,surface,departement,region,centre,siren`
          );
          if (response && response.data) {
            setCommunes(response.data);
          }
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      };
      timeoutId = setTimeout(fetchData, 300);
    } else {
      setCommunes([]);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <Box id="main" sx={{ height: "100%", px: { xs: 1, md: 3 }, mb: 3 }}>
      <Box sx={{ mb: 1 }}>
        <Typography sx={{ mb: 2 }} variant="h4">
          Les communes françaises
        </Typography>
        <Typography sx={{ mb: 2 }} variant="h6">
          Il y a plus de 35 milles communes en France.
        </Typography>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Autocomplete
            id="commune-combo-box"
            sx={{ width: { xs: 290, md: 500 } }}
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
                <Box sx={{ width: "50%" }}>
                  <b>{option.nom}</b>
                </Box>
                <Box sx={{ width: "50%" }}>
                  {option.departement.code} - {option.departement.nom}
                </Box>
              </Box>
            )}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue.trim());
            }}
            onChange={(event, newValue) => {
              setSelectedCommune(newValue);
              if (newValue) {
                updateCenter(
                  newValue.centre.coordinates[1],
                  newValue.centre.coordinates[0]
                );
              }
            }}
            noOptionsText={"Acune commune trouvée"}
            clearText={"Effacer"}
            openText={"Ouvrir"}
            blurOnSelect={"touch"}
            renderInput={(params) => (
              <TextField {...params} label="Chercher des communes" />
            )}
          />
          <Chip
            label={communes.length > 0 ? communes.length : "0"}
            color={communes.length > 0 ? "success" : "primary"}
            sx={{
              ml: 1,
              height: 50,
              minWidth: 50,
              width: "auto",
              fontSize: 16,
            }}
          />
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
