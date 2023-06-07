import React from "react";
import { News } from "./News";
import { useAnimalContext } from "../../Context/AnimalContext";

export const NewsContainer = () => {
  const { newsData, baseURL } = useAnimalContext();
  return <News news={newsData} baseURL={baseURL} />;
};
