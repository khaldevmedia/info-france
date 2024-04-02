// CalRegionPup.jsx

import React, { useState, useEffect } from "react";
import api from "../../api/geoAPI";
import { CircularProgress, Typography } from "@mui/material";

const CalRegionPup = ({ regCode }) => {
  const [regionPopulation, setRegionPopulation] = useState(null);

  useEffect(() => {
    // Récupérer la liste des départements pour la région
    const fetchDepartments = async () => {
      if (regCode) {
        try {
          const response = await api.get(`regions/${regCode}/departements`);
          const departmentsData = response.data;

          // Initialiser la total de la population
          let totalPopulation = 0;

          // Récupérer la population de chaque département
          for (const department of departmentsData) {
            const departmentResponse = await api.get(
              `departements/${department.code}/communes`
            );
            const communesData = departmentResponse.data;

            // Additionner la population de chaque commune
            for (const commune of communesData) {
              // Verifier d'abord que `commune` a an attribut `population`
              //   car certaines objets de commune n'ont pas d'attribut `population`
              if ("population" in commune) {
                totalPopulation += commune.population;
              }
            }
          }

          // Définir la population calculée de la région
          setRegionPopulation(totalPopulation);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchDepartments();
  }, [regCode]);

  useEffect(() => {}, [regionPopulation]);

  return regionPopulation !== null ? (
    regionPopulation.toLocaleString("fr-FR") + "."
  ) : (
    <CircularProgress size={15} />
  );
};

export default CalRegionPup;
