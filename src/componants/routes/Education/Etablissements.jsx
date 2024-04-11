import React, { useState, useEffect } from "react";
import api from "../../../api/eduAPI";
import { Box, Typography, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const Etablissements = () => {
  const [state, setState] = useState({
    data: [],
    offset: -20, // Initialize offset to -state.limit
    limit: 20,
    commune: "Chassieu",
    totalCount: null,
    hasMore: true,
  });

  const fetchData = async () => {
    const newOffset = state.offset + state.limit;
    if (state.totalCount && newOffset >= state.totalCount) {
      setState((prevState) => ({ ...prevState, hasMore: false }));
      return;
    }

    const response = await api.get(
      `?where=nom_commune=%22${state.commune}%22&limit=${state.limit}&offset=${newOffset}`
    );

    setState((prevState) => ({
      ...prevState,
      totalCount: response.data.total_count,
      data: [...prevState.data, ...response.data.results],
      offset: newOffset,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h4">Commune : {state.commune}</Typography>
        {console.log(`Limit: ${state.limit}`)}
        {console.log(`Offset: ${state.offset}`)}
        <Typography variant="h5">
          Nombre total des établissements : {state.totalCount}
        </Typography>
      </Box>
      <InfiniteScroll
        dataLength={state.data.length}
        next={fetchData}
        hasMore={state.hasMore}
        loader={<CircularProgress />}
      >
        {state.data.map((item, index) => (
          <Box key={index}>
            <Typography variant="h6">
              {index + " " + item.nom_etablissement}
            </Typography>
            <Typography variant="body1">{item.type_etablissement}</Typography>
            <Typography variant="body2">{item.statut_public_prive}</Typography>
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default Etablissements;
