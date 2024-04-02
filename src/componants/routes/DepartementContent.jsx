import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/geoAPI";
import CenteredBox from "../SubComponants/CenteredBox";
import {
  Box,
  Alert,
  CircularProgress,
  Typography,
  TextField,
} from "@mui/material";

function DepartementContent({ depNum }) {
  return <div>DepartementContent</div>;
}

export default DepartementContent;
