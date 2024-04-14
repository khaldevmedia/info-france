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
import ApiIcon from "@mui/icons-material/Api";
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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import StoreIcon from "@mui/icons-material/Store";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

// Context
import { AppContext } from "../main/AppContext";

function DrawerContent() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { setMobileOpen, setIsClosing, mobileOpen, setSelectedCommune } =
    useContext(AppContext);

  // Dérouler les sous-menus
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);
  const [eduMenuOpen, setEduMenuOpen] = useState(false);
  const [entMenuOpen, setEntMenuOpen] = useState(false);

  const handleMenuItemClick = (itemLink, itemText) => {
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
      switch (itemText) {
        case "Organisation":
          setOrgMenuOpen(!orgMenuOpen);
          break;
        case "Éducation":
          setEduMenuOpen(!eduMenuOpen);
          break;
        case "Entreprises":
          setEntMenuOpen(!entMenuOpen);
          break;
      }
    }
  };

  const linkList = [
    {
      text: "Accueil",
      link: "/",
      icon: <HomeIcon />,
      dividerAfter: false,
      inBool: null,
      subList: null,
    },
    {
      text: "À propos",
      link: "/about",
      icon: <InfoIcon />,
      dividerAfter: true,
      inBool: null,
      subList: null,
    },
    {
      text: "Organisation",
      link: null,
      icon: <MapIcon />,
      dividerAfter: false,
      inBool: orgMenuOpen,
      subList: [
        {
          text: "Collectivités",
          link: "/collectivites",
          icon: <GroupsIcon />,
          dividerAfter: false,
          inBool: null,
          subList: null,
        },
        {
          text: "Régions",
          link: "/collectivites/regions",
          icon: <LocationCityIcon />,
          dividerAfter: false,
          inBool: null,
          subList: null,
        },
        {
          text: "Départements",
          link: "/collectivites/departements",
          icon: <ApartmentIcon />,
          dividerAfter: false,
          inBool: null,
          subList: null,
        },
        {
          text: "Communes",
          link: "/collectivites/communes",
          icon: <MapsHomeWorkIcon />,
          dividerAfter: true,
          inBool: null,
          subList: null,
        },
      ],
    },
    {
      text: "Éducation",
      link: null,
      icon: <SchoolIcon />,
      dividerAfter: false,
      inBool: eduMenuOpen,
      subList: [
        {
          text: "Présentation ",
          link: "/education",
          icon: <ImportContactsIcon />,
          dividerAfter: false,
          inBool: null,
          subList: null,
        },
        {
          text: "Établissements",
          link: "/education/etablissements",
          icon: <AccountBalanceIcon />,
          dividerAfter: true,
          inBool: null,
          subList: null,
        },
      ],
    },
    {
      text: "Entreprises",
      link: null,
      icon: <BusinessIcon />,
      dividerAfter: false,
      inBool: entMenuOpen,
      subList: [
        {
          text: "Présentation ",
          link: "/entreprises",
          icon: <BusinessCenterIcon />,
          dividerAfter: false,
          inBool: null,
          subList: null,
        },
        {
          text: "Établissements",
          link: "/entreprises/etablissements",
          icon: <StoreIcon />,
          dividerAfter: true,
          inBool: null,
          subList: null,
        },
      ],
    },
  ];

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
        <ApiIcon sx={{ fontSize: 30, mr: 2 }} />
        <Typography variant="h6">MENU</Typography>
      </Toolbar>
      <Divider />
      <List disablePadding sx={{ width: "100%", maxWidth: 240 }}>
        {linkList.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              onClick={() => handleMenuItemClick(item.link, item.text)}
              divider={item.dividerAfter}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.link ? null : item.inBool ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {item.subList &&
              item.subList.map((subItem, subIndex) => (
                <Collapse
                  key={subIndex}
                  in={item.inBool}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() =>
                        handleMenuItemClick(subItem.link, subItem.text)
                      }
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
