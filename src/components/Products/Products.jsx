import React from "react";
import { Box, Typography } from "@mui/material";
import leftArrowSVG from "../../assets/CurrentAnimalPage/left-arrow.svg";
import rightArrowSVG from "../../assets/CurrentAnimalPage/right-arrow.svg";
import { ProductCard } from "./ProductCard";

export const Products = ({
  products,
  currentPage,
  handleIncrementPage,
  handleDecrementPage,
  maxPages,
}) => {
  const page = `Страница ${currentPage}`;

  const classNameRightArrow = `${
    maxPages === currentPage ? "opacity-30" : "cursor-pointer"
  }`;

  const classNameLeftArrow = `${
    currentPage === 1 ? "opacity-30" : "cursor-pointer"
  }`;

  const handleClickLeftArrow = () => {
    if (currentPage !== 1) handleDecrementPage();
  };

  const handleClickRightArrow = () => {
    if (currentPage < maxPages) handleIncrementPage();
  };

  if (products == null) {
    return (
      <Typography>Товаров не найдено :(</Typography>
    )
  }

  const productsElements = products.map((el) => (
    <ProductCard
      key={el.id}
      {...el}
      photo={`${el?.photos?.[0]}`}
    />
  ));

  return (
    <>
      <div className={`grid sm:grid-cols-1 md:grid-cols-3 `}>
        {productsElements}
      </div>
      <Box className="m-auto w-max flex"
       sx={{
        position: 'fixed',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}>
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
