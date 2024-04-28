import React from "react";
import { News } from "./News";
import { useAnimalContext } from "../../Context/AnimalContext";

export const NewsContainer = () => {
  const { newsData, SERVICE_STORAGE_URL } = useAnimalContext();
  return <News news={newsData} baseURL={SERVICE_STORAGE_URL} />;
};
