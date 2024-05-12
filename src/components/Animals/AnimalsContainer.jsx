import React, { useEffect, useState } from "react";
import { Animals } from "./Animals";
import { useAnimalContext } from "../../Context/AnimalContext";

export const AnimalsContainer = ({ isAllAnimal }) => {
  const { baseURL, animalsData, maxAnimalsPages, updateAnimals, currentAnimalPage, setCurrentAnimalPage } = useAnimalContext();

  useEffect(() => {
    setCurrentAnimalPage(1);
  }, [isAllAnimal]);

  const handleIncrementPage = () => {
    setCurrentAnimalPage((prev) => (prev += 1));
    updateAnimals(currentAnimalPage + 1)
  };

  const handleDecrementPage = () => {
    setCurrentAnimalPage((prev) => (prev -= 1));
    updateAnimals(currentAnimalPage - 1)
  };

  return (
    <Animals
      animals={animalsData}
      baseURL={baseURL}
      handleIncrementPage={handleIncrementPage}
      handleDecrementPage={handleDecrementPage}
      currentAnimalPage={currentAnimalPage}
      maxAnimalsPages={maxAnimalsPages}
    />
  );
};
