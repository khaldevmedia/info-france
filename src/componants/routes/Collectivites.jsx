import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Collectivites() {
  const navigate = useNavigate();
  return (
    <Box component="main" sx={{ height: "100vh", px: { md: 3, xs: 2 } }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        <Typography>Collectivités</Typography>
      </Breadcrumbs>
      <Typography sx={{ mb: 2 }} variant="h4">
        Collectivités territoriales de France.
      </Typography>
      <Typography variant="h6">
        Note sur les chiffres de population :
      </Typography>
      <Typography align="justify" sx={{ mt: { xs: 1, md: 2 }, mb: 2 }}>
        L'API utilisée ne fournit de données concernant la population que pour
        les communes. Elle ne fournit pas de chiffres sur la population des
        régions ni des départements. On calcule alors la population de ceux-ci
        en additionnant la population de toutes les communes qu'ils contiennent.
        Cependant, la population calculée n'est pas codée en dur (c-à-d elle
        n'est pas une valeur fixe dans le code source), mais son chiffre est
        calculé chaque fois la page est rechargée.
      </Typography>
      <Typography variant="h6" sx={{ mb: 0 }}>
        Les collectivites :
      </Typography>
      <Box
        sx={{
          mt: { xs: 1, md: 2 },
          mb: 5,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
        }}
      >
        <Card
          sx={{ width: { xs: "100%", md: "33.33%" } }}
          onClick={() => navigate("regions")}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="static/images/cards/region.png"
              alt="Image régions"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Régions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Il y a 18 régions en France dont 5 en outre-mère.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{ width: { xs: "100%", md: "33.33%" } }}
          onClick={() => navigate("departements")}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="static/images/cards/departement.png"
              alt="Image départements"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Départements
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Il y a 101 dépatrements en France dont 5 en outre-mère.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{ width: { xs: "100%", md: "33.33%" } }}
          onClick={() => navigate("communes")}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="static/images/cards/commune.png"
              alt="Image communes"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Communes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Il y a plus de 35 milles communes en France.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}

export default Collectivites;
