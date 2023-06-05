import React from "react";
import { Animals } from "./Animals";
import { useAnimalContext } from "../../../Context/AnimalContext";

export const AnimalsContainer = () => {
  const { baseURL, animalsData } = useAnimalContext();
  return <Animals animals={animalsData} baseURL={baseURL} />;
};
