import { useState, useEffect } from "react";
// MUI Componants
import {
  Box,
  Typography,
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Context
import { AppContext } from "./AppContext";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// React-router-dom
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTopButton from "../SubComponants/ScrollToTopButton";

// Nos colmponants
import Home from "../routes/Home";
import About from "../routes/About";
import Collectivites from "../routes/Collectivites";
import Communes from "../routes/Communes";
import CommuneView from "../routes/CommuneView";
import AllDepartements from "../routes/AllDepartements";
import AllRegions from "../routes/AllRegions";
import Entreprises from "../routes/Entreprises";
import Page404 from "../routes/Page404";
import DepartementView from "../routes/DepartementView";
import Education from "../routes/Education";
import ScrollToTopAndCloseDrawer from "../SubComponants/ScrollToTopAndCloseDrawer";
import RegionsView from "../routes/RegionView";
import DrawerContent from "../SubComponants/DrawerContent";

const drawerWidth = 240;
const appTitle = "Info France";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    toolbarBgColor: "#1564b3",
    toolbarTitleColor: "#fff",
    drawerBgColor: "#f2f2f2",
    dropListBorderColor: "grey.300",
  },
  typography: {
    h6: {
      fontSize: "1.20rem",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    toolbarBgColor: "#061d33",
    toolbarTitleColor: "#fff",
    drawerBgColor: "#262626",
    dropListBorderColor: "grey.700",
  },
  typography: {
    h6: {
      fontSize: "1.20rem",
    },
  },
});

function App() {
  // Thèmes
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  // Chargement
  const [isMounted, setIsMounted] = useState(false);

  //Etats globaux
  const [selectedRegion, setSelectedRegion] = useState({});
  const [selectedDepartement, setSelectedDepartement] = useState({});
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [departementsList, setDepartementsList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Chargement...</div>; // Message de chargement
  }

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          // Paires
          selectedRegion,
          setSelectedRegion,
          selectedDepartement,
          setSelectedDepartement,
          selectedCommune,
          setSelectedCommune,
          departementsList,
          setDepartementsList,
          regionsList,
          setRegionsList,
          // L'un ou l'autre
          setMobileOpen,
          mobileOpen,
          setIsClosing,
        }}
      >
        <Router>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ mr: 2, display: { sm: "none" } }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                      {appTitle}
                    </Typography>
                  </Box>
                  <Box sx={{ pr: { xs: 0, md: 10 } }}>
                    <IconButton
                      color="inherit"
                      aria-label="Github link"
                      edge="start"
                      href="https://github.com/khaldevmedia/info-france.git"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitHubIcon sx={{ fontSize: { md: 30, xs: 25 } }} />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="Toogle theme"
                      onClick={() => setDarkMode(!darkMode)}
                    >
                      {darkMode ? (
                        <LightModeIcon sx={{ fontSize: { md: 30, xs: 25 } }} />
                      ) : (
                        <DarkModeIcon sx={{ fontSize: { md: 30, xs: 25 } }} />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 },
              }}
              aria-label="mailbox folders"
            >
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                  keepMounted: true, // true = Une meilleure performance sur les téléphones.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    backgroundColor: theme.palette.drawerBgColor,
                  },
                }}
              >
                <DrawerContent />
              </Drawer>
              <Drawer
                open
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    backgroundColor: theme.palette.drawerBgColor,
                  },
                }}
              >
                <DrawerContent />
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: { xs: 2, md: 3 },
                px: { xs: 0, md: 3 },
                width: { sm: `calc(100% - ${drawerWidth}px)` },
              }}
            >
              <Toolbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/collectivites" element={<Collectivites />} />
                <Route path="/collectivites/communes" element={<Communes />} />
                <Route
                  path="/collectivites/departements"
                  element={<AllDepartements />}
                />
                <Route
                  path="/collectivites/departements/:departementName"
                  element={<DepartementView />}
                />
                <Route
                  path="/collectivites/departements/:departementName/:communeName"
                  element={<CommuneView />}
                />
                <Route path="/collectivites/regions" element={<AllRegions />} />
                <Route
                  path="/collectivites/regions/:regionName"
                  element={<RegionsView />}
                />
                <Route
                  path="/collectivites/regions/:regionName/:departementName"
                  element={<DepartementView />}
                />
                <Route
                  path="/collectivites/regions/:regionName/:departementName/:communeName"
                  element={<CommuneView />}
                />
                <Route path="/entreprises" element={<Entreprises />} />
                <Route path="/education" element={<Education />} />
                <Route path="404" element={<Page404 />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
              <ScrollToTopAndCloseDrawer />
            </Box>
            <ScrollToTopButton />
          </Box>
        </Router>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
