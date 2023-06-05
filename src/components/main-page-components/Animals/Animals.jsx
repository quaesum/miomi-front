import React from "react";
import { useNavigate } from "react-router";
import { AnimalCard } from "./AnimalCard";

export const ageTransformation = (ageAnimal) => {
  let age = "";
  let percentAge = ageAnimal % 10;
  if (percentAge === 1 && ageAnimal < 10) age += "год";
  if (percentAge >= 2 && percentAge <= 4 && ageAnimal < 10) age += "года";
  if ((percentAge >= 5 && percentAge <= 9) || percentAge === 0) age += "лет";
  else if (ageAnimal >= 10 && ageAnimal <= 20) age += "лет";
  return age;
};

export const Animals = ({ animals, baseURL }) => {
  const navigate = useNavigate();

  const handleAnimalClick = (id) => {
    navigate(`/animal/${id}`);
  };

  const animalsElements = animals.map((el) => (
    <AnimalCard
      key={el.id}
      {...el}
      photo={`${baseURL}${el.photos[0]}`}
      handleAnimalClick={handleAnimalClick}
      ageText={ageTransformation(el.age)}
    />
  ));

  return (
    <div className={`grid sm:grid-cols-1 md:grid-cols-3 `}>
      {animalsElements}
    </div>
  );
};
