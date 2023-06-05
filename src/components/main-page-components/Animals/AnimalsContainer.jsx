import React, { useEffect, useState } from "react";
import { Animals } from "./Animals";
import { useAnimalContext } from "../../../Context/AnimalContext";

export const AnimalsContainer = ({ isAllAnimals }) => {
  const { baseURL, animalsData } = useAnimalContext();
  console.log(isAllAnimals);
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const animalsOnPage = 12;
  const maxPages = Math.floor(animalsData.length / animalsOnPage);

  useEffect(() => {
    const lower_limit = 0 + animalsOnPage * (currentPage - 1);
    const upper_limit = currentPage * animalsOnPage;

    let tempAnimals = animalsData.slice(lower_limit, upper_limit);

    console.log(lower_limit, upper_limit, currentPage);

    setAnimals(tempAnimals);
  }, [animalsData, currentPage]);

  const handleIncrementPage = () => {
    setCurrentPage((prev) => (prev += 1));
  };

  const handleDecrementPage = () => {
    setCurrentPage((prev) => (prev -= 1));
  };

  return (
    <Animals
      animals={animals}
      baseURL={baseURL}
      handleIncrementPage={handleIncrementPage}
      handleDecrementPage={handleDecrementPage}
      currentPage={currentPage}
      maxPages={maxPages}
    />
  );
};
