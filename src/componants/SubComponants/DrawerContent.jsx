import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// MUI Componants
import {
  Typography,
  Divider,
  Toolbar,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

// MUI Icons
import BlurOnIcon from "@mui/icons-material/BlurOn";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork"; // Collectivités
import GroupsIcon from "@mui/icons-material/Groups"; //Communes
import ApartmentIcon from "@mui/icons-material/Apartment"; // Départements
import LocationCityIcon from "@mui/icons-material/LocationCity"; // Régions
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Context
import { AppContext } from "../main/AppContext";

const linkList = [
  {
    text: "Accueil",
    link: "/",
    icon: <HomeIcon />,
    dividerAfter: false,
    subList: null,
  },
  {
    text: "À propos",
    link: "/about",
    icon: <InfoIcon />,
    dividerAfter: true,
    subList: null,
  },
  {
    text: "Organisation",
    link: null,
    icon: <MapIcon />,
    dividerAfter: false,
    subList: [
      {
        text: "Collectivités",
        link: "/collectivites",
        icon: <GroupsIcon />,
        dividerAfter: false,
        subList: null,
      },
      {
        text: "Régions",
        link: "/collectivites/regions",
        icon: <LocationCityIcon />,
        dividerAfter: false,
        subList: null,
      },
      {
        text: "Départements",
        link: "/collectivites/departements",
        icon: <ApartmentIcon />,
        dividerAfter: false,
        subList: null,
      },
      {
        text: "Communes",
        link: "/collectivites/communes",
        icon: <MapsHomeWorkIcon />,
        dividerAfter: true,
        subList: null,
      },
    ],
  },
  {
    text: "Éducation",
    link: "/education",
    icon: <SchoolIcon />,
    dividerAfter: false,
    subList: null,
  },
  {
    text: "Entreprises",
    link: "/entreprises",
    icon: <BusinessIcon />,
    dividerAfter: false,
    subList: null,
  },
];

function DrawerContent() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { setMobileOpen, setIsClosing, mobileOpen, setSelectedCommune } =
    useContext(AppContext);

  // Dérouler le sous-menu
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);

  const handleMenuItemClick = (itemLink) => {
    if (itemLink) {
      if (itemLink === "/collectivites/communes") {
        setSelectedCommune(null);
      }
      if (mobileOpen) {
        navigate(itemLink);
        setIsClosing(true);
        setMobileOpen(false);
      } else {
        navigate(itemLink);
      }
    } else {
      setOrgMenuOpen(!orgMenuOpen);
    }
  };

  return (
    <div>
      <Toolbar
        sx={{
          backgroundColor: theme.palette.toolbarBgColor,
          color: theme.palette.toolbarTitleColor,
          boxShadow: 3,
        }}
        component="nav"
        aria-labelledby="Titre de la liste de navigation"
      >
        <BlurOnIcon sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h6">MENU</Typography>
      </Toolbar>
      <Divider />
      <List disablePadding sx={{ width: "100%", maxWidth: 240 }}>
        {linkList.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              onClick={() => handleMenuItemClick(item.link)}
              divider={item.dividerAfter}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.link ? null : orgMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {item.subList &&
              item.subList.map((subItem, subIndex) => (
                <Collapse
                  key={subIndex}
                  in={orgMenuOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => handleMenuItemClick(subItem.link)}
                      divider={subItem.dividerAfter}
                    >
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  </List>
                </Collapse>
              ))}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default DrawerContent;
