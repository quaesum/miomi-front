import React, { useEffect, useState } from "react";
import { Animals } from "./Animals";
import { useAnimalContext } from "../../Context/AnimalContext";

export const AnimalsContainer = ({ isAllAnimal }) => {
  const { baseURL, animalsData, maxAnimalsPages, updateAnimals, currentAnimalPage, setCurrentAnimalPage } = useAnimalContext();

  useEffect(() => {
    setCurrentAnimalPage(1);
  }, [isAllAnimal]);

  let currentPage = Number(localStorage.getItem("animals_page"));
  let maxPage = Number(localStorage.getItem("animals_max_page"));

  const handleIncrementPage = () => {
    localStorage.setItem("animals_page", currentPage + 1)
    setCurrentAnimalPage((prev) => {prev += 1
    });
    updateAnimals()
  };

  const handleDecrementPage = () => {
    localStorage.setItem("animals_page", currentPage - 1)
    setCurrentAnimalPage((prev) => {
      prev -= 1;
    }
    );
    updateAnimals()
  };

  return (
    <Animals
      prev={"/"}
      animals={animalsData}
      baseURL={baseURL}
      handleIncrementPage={handleIncrementPage}
      handleDecrementPage={handleDecrementPage}
      currentAnimalPage={currentPage}
      maxAnimalsPages={maxPage}
    />
  );
};
