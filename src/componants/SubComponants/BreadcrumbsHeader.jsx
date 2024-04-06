import { useNavigate, useLocation } from "react-router-dom";

import { Breadcrumbs, Typography, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function BreadcrumbsHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathArray = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "");

  const betterNames = {
    regions: "Régions",
    departements: "Départements",
    collectivites: "Collectivités",
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 2 }}
    >
      {pathArray.map((crumb, index) => {
        let currentLink = `/${pathArray.slice(0, index + 1).join("/")}`;

        let displayCrumb = betterNames[crumb]
          ? betterNames[crumb]
          : decodeURIComponent(crumb);

        if (index === pathArray.length - 1) {
          return <Typography key={index}>{displayCrumb}</Typography>;
        } else {
          return (
            <Link
              key={index}
              underline="hover"
              href=""
              onClick={(event) => {
                event.preventDefault();
                navigate(currentLink);
              }}
            >
              {displayCrumb}
            </Link>
          );
        }
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsHeader;
