import React, { useEffect, useState } from "react";
import { Animals } from "./Animals";
import { useAnimalContext } from "../../Context/AnimalContext";

export const AnimalsContainer = ({ isAllAnimal }) => {
  const { baseURL, animalsData, maxPages, updateAnimals } = useAnimalContext();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    setCurrentPage(1);
  }, [isAllAnimal]);

  const handleIncrementPage = () => {
    setCurrentPage((prev) => (prev += 1));
    updateAnimals(currentPage + 1)
  };

  const handleDecrementPage = () => {
    setCurrentPage((prev) => (prev -= 1));
    updateAnimals(currentPage - 1)
  };

  return (
    <Animals
      animals={animalsData}
      baseURL={baseURL}
      handleIncrementPage={handleIncrementPage}
      handleDecrementPage={handleDecrementPage}
      currentPage={currentPage}
      maxPages={maxPages}
    />
  );
};
