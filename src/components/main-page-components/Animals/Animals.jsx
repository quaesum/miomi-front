import React from "react";
import { useNavigate } from "react-router";
import { AnimalCard } from "./AnimalCard";
import { Box, Typography } from "@mui/material";
import leftArrowSVG from "../../../assets/CurrentAnimalPage/left-arrow.svg";
import rightArrowSVG from "../../../assets/CurrentAnimalPage/right-arrow.svg";

export const ageTransformation = (ageAnimal) => {
  let age = "";
  let percentAge = ageAnimal % 10;
  if (percentAge === 1 && ageAnimal < 10) age += "год";
  if (percentAge >= 2 && percentAge <= 4 && ageAnimal < 10) age += "года";
  if ((percentAge >= 5 && percentAge <= 9) || percentAge === 0) age += "лет";
  else if (ageAnimal >= 10 && ageAnimal <= 20) age += "лет";
  return age;
};

export const Animals = ({
  animals,
  baseURL,
  currentPage,
  handleIncrementPage,
  handleDecrementPage,
  maxPages,
}) => {
  const navigate = useNavigate();
  const page = `Страница ${currentPage}`;
  const classNameRightArrow = `${
    maxPages === currentPage ? "opacity-30" : "cursor-pointer"
  }`;

  const classNameLeftArrow = `${
    currentPage === 1 ? "opacity-30" : "cursor-pointer"
  }`;

  const handleAnimalClick = (id) => {
    navigate(`/animals/${id}`);
  };

  const handleClickLeftArrow = () => {
    if (currentPage !== 1) handleDecrementPage();
  };

  const handleClickRightArrow = () => {
    if (currentPage <= maxPages) handleIncrementPage();
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
    <>
      <div className={`grid sm:grid-cols-1 md:grid-cols-3 `}>
        {animalsElements}
      </div>
      <Box className="m-auto w-max flex">
        <img
          src={leftArrowSVG}
          alt="left-arrow"
          className={classNameLeftArrow}
          onClick={handleClickLeftArrow}
        />
        <Typography className="!mx-10" fontSize={20} sx={{ color: "#EE7100" }}>
          {page}
        </Typography>
        <img
          src={rightArrowSVG}
          alt="right-arrow"
          className={classNameRightArrow}
          onClick={handleClickRightArrow}
        />
      </Box>
    </>
  );
};
