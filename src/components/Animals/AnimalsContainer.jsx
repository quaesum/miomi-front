import React, { useEffect, useState } from "react";
import { Animals } from "./Animals";
import { useAnimalContext } from "../../Context/AnimalContext";

export const AnimalsContainer = ({ isAllAnimal }) => {
  const { baseURL, animalsData, userData } = useAnimalContext();
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const animalsOnPage = 12;

  useEffect(() => {
    const lower_limit = 0 + animalsOnPage * (currentPage - 1);
    const upper_limit = currentPage * animalsOnPage;

    let tempAnimals = animalsData;
    //Sort by shelter id
    if (!isAllAnimal) {
      tempAnimals = animalsData.filter((el) => el.shelterId === userData.shelter_id); //TODO userData.shelterId replace 1
    }

    //Max pages
    setMaxPages(Math.ceil(tempAnimals.length / animalsOnPage));

    //Slice for pages
    tempAnimals = tempAnimals.slice(lower_limit, upper_limit);

    setAnimals(tempAnimals);
  }, [animalsData, currentPage, isAllAnimal, userData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [isAllAnimal]);

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
