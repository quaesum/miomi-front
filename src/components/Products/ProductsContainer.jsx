import React, { useEffect, useState } from "react";
import { Products } from "./Products";
import { useAnimalContext } from "../../Context/AnimalContext";

export const ProductsContainer = ({ isAllAnimal }) => {
  const { productsData, maxProductsPages, updateProducts, currentProductPage, setCurrentProductPage} = useAnimalContext();

  let currentPage = Number(localStorage.getItem("products_page"));
  let maxPage = Number(localStorage.getItem("products_max_page"));

  const handleIncrementPage = () => {
    localStorage.setItem("products_page", currentPage + 1)
    setCurrentProductPage((prev) => {
      prev += 1
    });
    updateProducts()
  };

  const handleDecrementPage = () => {
    localStorage.setItem("products_page", currentPage - 1)
    setCurrentProductPage((prev) => {
      prev -= 1
    });
    updateProducts()

  };

  return (
    <Products
      products={productsData}
      handleIncrementPage={handleIncrementPage}
      handleDecrementPage={handleDecrementPage}
      currentPage={currentPage}
      maxPages={maxPage}
    />
  );
};
