import React from "react";
import { useAnimalContext } from "../../Context/AnimalContext";
import { Service } from "./Service";
import { Typography } from "@mui/material";

export const ServiceContainer = () => {
  const { servicesData, SERVICE_STORAGE_URL } = useAnimalContext();
  if (servicesData == null) {
    return (
      <Typography>Услуг не найдено</Typography>
    )
  }
  return <Service services={servicesData} baseURL={SERVICE_STORAGE_URL} />;
};
