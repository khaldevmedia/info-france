import React from "react";
import { Box } from "@mui/material";
import CommuneDetails from "../SubComponants/CommuneDetails";
import BreadcrumbsHeader from "../SubComponants/BreadcrumbsHeader";

function CommuneView() {
  return (
    <Box component="main" sx={{ height: "100%", px: { md: 3, xs: 2 } }}>
      <BreadcrumbsHeader />
      <CommuneDetails />
    </Box>
  );
}

export default CommuneView;
