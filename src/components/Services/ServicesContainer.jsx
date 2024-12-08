import React from "react";
import { useAnimalContext } from "../../Context/AnimalContext";
import { Service } from "./Service";
import { Typography } from "@mui/material";

export const ServiceContainer = () => {
  const { servicesData, SERVICE_STORAGE_URL } = useAnimalContext();
  if (servicesData == null) {
    return (
      <div className="flex items-center text-center">
        <Typography color="gray" className="w-full">
          Услуг не найдено :(
        </Typography>
      </div>
    )
  }
  return <Service services={servicesData} baseURL={SERVICE_STORAGE_URL} />;
};
